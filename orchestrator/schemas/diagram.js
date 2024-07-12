const { GraphQLError } = require("graphql");
const { DateTimeResolver } = require("graphql-scalars");

module.exports = {
  diagramTypes: `#graphql
    scalar DateTime

    type Query {
      
    }

    type Mutation {
      
    }
  `,

  diagramResolvers: {
    DateTime: DateTimeResolver,

    Query: {},

    Mutation: {},
  },
};
