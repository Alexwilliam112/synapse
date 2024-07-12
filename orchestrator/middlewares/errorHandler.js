const { GraphQLError } = require("graphql");

module.exports = function errorHandler(response) {
  const status = response.data.statusCode;

  const error = (msg, code) => {
    return new GraphQLError(msg, {
      extensions: {
        http: {
          status: code,
        },
      },
    });
  };

  switch (status) {
    case 400: {
      throw error('Bad Request', status)
    }

    case 401: {
      throw error('Unauthorized', status)
    }

    case 403: {
      throw error('Forbidden', status)
    }

    case 404: {
      throw error('Not Found', status)
    }

    case 500: {
      throw error('Internal Server Error', status)
    }

    default: {
      break;
    }
  }
};
