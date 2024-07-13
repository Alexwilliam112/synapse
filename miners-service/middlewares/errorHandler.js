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

    // console.log(err);
    res.status(status).json({
      message,
      // err
      // status,
      // err
    });
  },
};
