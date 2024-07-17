const { GraphQLError } = require("graphql");
const { DateTimeResolver } = require("graphql-scalars");
const axios = require("axios");
const errorHandler = require("../middlewares/errorHandler");
const { signTokenServer } = require("../utils/jwt");

module.exports = {
  minerTypeDefs: `#graphql

    type MiningResponse{
      statusCode: Int
    }

    input MiningRequest {
      startDate: String!
      endDate: String!
      endpointUrl: String!
      apiKey: String!
    }

    type Query {
      EmptyQuery2: Int
    }

    type Mutation{
      StartMining(input: MiningRequest): MiningResponse
      }
  `,

  minerResolvers: {
    DateTime: DateTimeResolver,

    Query: {},

    Mutation: {
      StartMining: async (_, args, context) => {
        const { startDate, endDate, endpointUrl, apiKey } = args.input;
        const token = await context.auth()
        console.log(apiKey, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
        const serverPayload = signTokenServer({
          startDate,
          endDate,
          endpointUrl,
          apiKey,
        });

        const response = await axios.post(
          "http://localhost:3005/startminer",
          { serverPayload },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        errorHandler(response);
        return {
          statusCode: 201
        }
      },
    },
  },
};
