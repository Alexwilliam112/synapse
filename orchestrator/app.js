if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { authentication } = require("./middlewares/authentication");
const { userResolvers, userTypeDefs } = require("./schemas/user");
const { endpointResolvers, endpointTypeDefs } = require("./schemas/endpoint");
const { minerTypeDefs, minerResolvers } = require("./schemas/miner");
const { dashboardTypes, dashboardResolvers } = require("./schemas/dashboard");

const csrfBypassPlugin = {
  async requestDidStart() {
    return {
      async didResolveOperation(requestContext) {
        if (process.env.NODE_ENV !== "production") {
          requestContext.preventCsrf = () => {};
        }
      },
    };
  },
};

// Cache control plugin to disable cache
const disableCachePlugin = {
  async requestDidStart() {
    return {
      async willSendResponse(requestContext) {
        requestContext.response.extensions = {
          ...requestContext.response.extensions,
          cacheControl: {
            defaultMaxAge: 0, // Disable cache by setting the default max age to 0
          },
        };
      },
    };
  },
};

const server = new ApolloServer({
  typeDefs: [userTypeDefs, endpointTypeDefs, minerTypeDefs, dashboardTypes],
  resolvers: [userResolvers, endpointResolvers, minerResolvers, dashboardResolvers],
  introspection: true,
  formatError: (err) => {
    console.error(err);
    return err;
  },
  plugins: [csrfBypassPlugin, disableCachePlugin],
});

(async () => {
  const { url } = await startStandaloneServer(server, {
    listen: process.env.PORT || 3000,
    context: async ({ req, res }) => {
      return {
        auth: async () => {
          return await authentication(req);
        },
      };
    },
  });
  console.log(`Server starting at ${url}`);
})();
