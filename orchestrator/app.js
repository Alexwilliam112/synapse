if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { authentication } = require("./middlewares/authentication");
const { userResolvers, userTypeDefs } = require("./schemas/user");
const { endpointResolvers, endpointTypeDefs } = require('./schemas/endpointMiners')

const server = new ApolloServer({
  typeDefs: [userTypeDefs, endpointTypeDefs],
  resolvers: [userResolvers, endpointResolvers],
  introspection: true,
  formatError: (err) => {
    console.error(err);
    return err;
  },
});

(async () => {
  const { url } = await startStandaloneServer(server, {
    listen: process.env.PORT || 3000,
    context: async ({ req, res }) => {
      return {
        auth: async () => {
          return await authentication(req);
        }
      };
    },
  });
  console.log(`Server starting at ${url}`);
})();
