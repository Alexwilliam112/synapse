const { GraphQLError } = require("graphql");
const { DateTimeResolver } = require("graphql-scalars");

module.exports = {
  dashboardTypes: `#graphql
    scalar DateTime

    type Query {
      
    }

    type Mutation {
      
    }
  `,

  dashboardResolvers: {
    DateTime: DateTimeResolver,

    Query: {},

    Mutation: {},
  },
};
