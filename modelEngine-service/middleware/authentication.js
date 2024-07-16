const { verifyToken } = require("../utils/jwt");

const Authentication = async (req, res, next) => {
  try {
    let { authorization } = req.headers;
    if (!authorization) throw { name: "Unauthorized" };

    const access_token = authorization.split(" ")[1];
    const payload = verifyToken(access_token);

    if (payload.origin !== process.env.USER_ORIGIN) {
      throw { name: "Unauthorized" };
    }

    req.loginInfo = payload;

    next();
  } catch (error) {
    console.log(error);
    next({
      statusCode: 400,
    });
  }
};

module.exports = Authentication;
