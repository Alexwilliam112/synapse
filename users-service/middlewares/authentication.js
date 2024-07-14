const { verifyToken } = require('../utils/jwt');

const authentication = async (req, res, next) => {
  try {
    const bodyToken = req.body.userPayload;

    const { authorization } = req.headers
    
    const authToken = authorization.split(" ")[1]

    if (!bodyToken || !authToken) throw { name: "Invalid" };

    const bodyDecoded = verifyToken(bodyToken);
    
    const authDecoded = verifyToken(authToken);

    if (authDecoded.origin !== process.env.USER_ORIGIN) throw { name: "Invalid" }

    req.bodyDecoded = bodyDecoded

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authentication };
