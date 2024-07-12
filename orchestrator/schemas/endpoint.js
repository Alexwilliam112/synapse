const { GraphQLError } = require("graphql");
const { DateTimeResolver } = require("graphql-scalars");

module.exports = {
  endpointTypeDefs: `#graphql
        scalar DateTime

        type GetEndpointsResponse {
          statusCode: Int
          data: String
        }

        type Query {
          GetEndpoints: GetEndpointsResponse
        }
    `,

  endpointResolvers: {
    DateTime: DateTimeResolver,

    Query: {},

  },
};
