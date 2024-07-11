const { GraphQLError } = require("graphql");
const { verifyTokenClient, signTokenUser } = require("../utils/jwt");
const axios = require("axios");

module.exports = {
  authentication: async (req) => {
    const authorization = req.headers.authorization;

    if (!authorization) {
      throw new GraphQLError("Unauthorized", {
        extensions: {
          http: {
            status: 401,
          },
        },
      });
    }

    const token = authorization.split(" ")[1];

    if (!token) {
      throw new GraphQLError("Unauthorized", {
        extensions: {
          http: {
            status: 401,
          },
        },
      });
    }

    const clientPayload = verifyTokenClient(token);
    const userPayload = signTokenUser({
      origin: process.env.USER_ORIGIN,
    });

    const response = await axios.post("/users", {
      body: {
        email: clientPayload.email,
        password: clientPayload.password,
      },
      headers: {
        Authorization: `Bearer ${userPayload}`,
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

    return response.data;
  },
};
