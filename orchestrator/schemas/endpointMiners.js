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

    type CreateRes{
      statusCode: Int
    }

    type Query {
      GetEndpoints: GetEndpointsResponse
    }

    input CreateEndpointInput {
      endpointUrl: String!
      description: String!
      apiKey: String!
    }

    input UpdateEndpointInput {
      id: Int!
      endpointUrl: String!
      description: String!
      apiKey: String!
    }

    input DeleteEndpointInput {
      id: Int!
    }

    type Mutation{
      CreateEndpoint(input: CreateEndpointInput): CreateRes
      UpdateEndpoint(input: UpdateEndpointInput): CreateRes
      DeleteEndpoint(input: DeleteEndpointInput): CreateRes
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

    Mutation: {
      CreateEndpoint: async (_, args, context) => {
        const token = await context.auth()
        const payload = {
          "endpointUrl": args.input.endpointUrl,
          "description": args.input.description,
          "apiKey": args.input.apiKey
        }
        const res = await axios.post('http://localhost:3002/api',
          payload
          , {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          })
        errorHandler(res)

        return {
          statusCode: 200,
        }
      },

      UpdateEndpoint: async (_, args, context) => {
        const token = await context.auth()
        const { id } = args.input
        const payload = {
          "endpointUrl": args.input.endpointUrl,
          "description": args.input.description,
          "apiKey": args.input.apiKey
        }
        const res = await axios.put(`http://localhost:3002/api/${id}`,
          payload
          , {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          })
        errorHandler(res)

        return {
          statusCode: 200,
        }
      },

      DeleteEndpoint: async (_, args, context) => {
        const token = await context.auth()
        const { id } = args.input
        const res = await axios.delete(`http://localhost:3002/api/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        errorHandler(res)

        return {
          statusCode: 200,
        }
      }
    }


  },
};
