const { GraphQLError } = require("graphql");
const { verifyToken } = require("../utils/jwt");
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

    const payload = verifyToken(token);
    const user = await axios.get(`/users/${payload.email}`);
    if (!user.data) {
      throw new GraphQLError("Unauthorized", {
        extensions: {
          http: {
            status: 401,
          },
        },
      });
    }

    return;
  },
};
