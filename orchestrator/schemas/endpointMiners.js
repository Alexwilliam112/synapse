const { GraphQLError } = require("graphql");
const { DateTimeResolver } = require("graphql-scalars");
const axios = require('axios')
const errorHandler = require('../middlewares/errorHandler')

module.exports = {
  endpointTypeDefs: `#graphql
    scalar DateTime

    type Endpoints {
      id: Int!
      endpointUrl: String!
      description: String!
      status: String!
      apiKey: String!
      CompanyId: Int!
    }

    type GetEndpointsResponse {
      statusCode: Int
      data: [Endpoints]
    }

    type Query {
      GetEndpoints: GetEndpointsResponse
    }
  `,

  endpointResolvers: {
    DateTime: DateTimeResolver,

    Query: {
      GetEndpoints: async (_, __, context) => {
        const token = await context.auth()

        const res = await axios.get('http://localhost:3002/api', {
          headers: {
            'Authorization': `Bearer ${token}`
            }
        })
        errorHandler(res)

        return {
          statusCode: 200,
          data: res.data.data
        }
      }
    },

  },
};
