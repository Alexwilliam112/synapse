if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { authentication } = require("./middlewares/authentication");
const { userResolvers, userTypeDefs } = require("./schemas/user");
const { endpointResolvers, endpointTypeDefs } = require("./schemas/endpoint");
const { minerTypeDefs, minerResolvers } = require("./schemas/miner");

const csrfBypassPlugin = {
  async requestDidStart() {
    return {
      async didResolveOperation(requestContext) {
        if (process.env.NODE_ENV !== 'production') {
          requestContext.preventCsrf = () => {};
        }
      }
    };
  }
};

const server = new ApolloServer({
  typeDefs: [userTypeDefs, endpointTypeDefs, minerTypeDefs],
  resolvers: [userResolvers, endpointResolvers, minerResolvers],
  introspection: true,
  formatError: (err) => {
    console.error(err);
    return err;
  },
  plugins: [
    csrfBypassPlugin,
  ],
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
