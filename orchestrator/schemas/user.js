const { signTokenUser, signTokenClient } = require("../utils/jwt");
const { GraphQLError } = require("graphql");
const { EmailAddressResolver, JSONResolver } = require("graphql-scalars");
const errorHandler = require('../middlewares/errorHandler')
const axios = require('axios')

module.exports = {
  userTypeDefs: `#graphql
    scalar EmailAddress
    scalar JSON

    input LoginInput {
      email: EmailAddress!
      password: String!
    }

    type LoginResponse {
      statusCode: Int!
      access_token: String!
      companyName: String!
      email: String!
    }

    type EmptyQueryResponse{
      statusCode: Int
    }

    type Query {
      EmptyQuery: EmptyQueryResponse
    }

    type Mutation {
      Login(input: LoginInput): LoginResponse
    }
	`,

  userResolvers: {
    EmailAddress: EmailAddressResolver,
    JSON: JSONResolver,

    Query: {},

    Mutation: {
      Login: async (_, args) => {
        const { input } = args;
        const { email, password } = input;

        const userHeader = signTokenUser({
          origin: process.env.USER_ORIGIN,
        });
        const userPayload = signTokenUser({
          email,
          password,
        });
        console.log(userPayload, 'YAHUUUUUUUUUUUUUUUUUUUUUUUUUUUUU')

        const response = await axios.post("http://localhost:3001/login", 
          { userPayload }, 
          {
          headers: {
            Authorization: `Bearer ${userHeader}`,
          },
        });

        errorHandler(response)

        const access_token = signTokenClient({
          email: response.data.data.email,
        });

        return {
          statusCode: 200,
          access_token,
          email: response.data.data.email,
          companyName: response.data.data.companyName,
        };
      },
    },
  },
};
