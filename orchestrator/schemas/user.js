const { signTokenUser, signTokenClient } = require("../utils/jwt");
const { GraphQLError } = require("graphql");
const { EmailAddressResolver, JSONResolver } = require("graphql-scalars");

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

        const response = await axios.post("/localhost:3001/users", {
          body: userPayload,
          headers: {
            Authorization: `Bearer ${userHeader}`,
          },
        });

        if (response.statusCode !== 200) {
          throw new GraphQLError("Unauthorized", {
            extensions: {
              http: {
                status: 401,
              },
            },
          });
        }

        const access_token = signTokenClient({
          email: response.data.email,
        });

        return {
          statusCode: 200,
          access_token,
          email: response.data.email,
          companyName: response.data.companyName,
        };
      },
    },
  },
};
