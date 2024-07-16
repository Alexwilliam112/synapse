module.exports = {
  errorHandler: async (err, req, res, next) => {
    let status = 500;
    let message = "Internal Server Error. Please Contact Server Administrator";

    if (err.name === 400) {
      status = 400;
      message = "Bad Request";
    }

    if (err.name === 401) {
      status = 401;
      message = "Unauthorized";
    }

    if (err.name === "JsonWebTokenError") {
      status = 401;
      message = "Unauthorized";
    }

    if (err.name == 400) {
      status = 404;
      message = "Not Found";
    }

    if (err.name === "ReqNotFound") {
      status = 404;
      message = "Request Not Found";
    }

    if (err.name === 500) {
      status = 500;
      message = "A Server is down";
    }

    if (err.name === 503) {
      switch (err.source) {
        case "su": {
          status = 504;
          message = "Destination User Server is unreachable.";
          break;
        }

        case "processMiner": {
          status = 503;
          message = "processMiner-Service Failed. Server Down.";
          break;
        }

        case "temporalMiner-service": {
          status = 503;
          message = "temporalAnalysis-Service Failed. Server Down.";
          break;
        }

        case "tracer-service": {
          status = 503;
          message = "GO Tracer-Service Failed. Server Down.";
          break;
        }

        case "analytics-service": {
          status = 503;
          message = "Analytics-Service unreachable. Server Down.";
          break;
        }

        case "modelEngine-service": {
          status = 503;
          message = "modelEngine-service unreachable. Server Down.";
          break;
        }

        default: {
          status = 504;
          message = "Timeout from destination server";
          break;
        }
      }
    }

    console.log(err);
    res.status(status).json({
      message,
      // err
      // status,
      // err
    });
  },
};
