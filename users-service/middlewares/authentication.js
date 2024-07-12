const { verifyToken } = require('../utils/jwt');
const { createToken } = require('../utils/tokenGenerator');

const authentication = async (req, res, next) => {
  try {
    let access_token = createToken()
    if (!access_token) throw { name: "Unauthorized" };

    const payload = verifyToken(access_token);
    
    if (!payload || payload.origin !== process.env.USER_ORIGIN) throw { name: "Unauthorized"}
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authentication };
