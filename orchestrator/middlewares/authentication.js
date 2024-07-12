const { GraphQLError } = require("graphql");
const {
  verifyTokenClient,
  signTokenUser,
  signTokenServer,
} = require("../utils/jwt");
const axios = require("axios");
const errorHandler = require("./errorHandler");

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

    const response = await axios.post("/findUser", {
      body: {
        email: clientPayload.email
      },
      headers: {
        Authorization: `Bearer ${userPayload}`,
      },
    });
    errorHandler(response)

    const { data } = response;
    const serverToken = signTokenServer(data);

    return serverToken;
  },
};
