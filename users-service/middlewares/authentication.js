const { verifyToken } = require('../utils/jwt');

const authentication = async (req, res, next) => {
  try {
    const bodyToken = req.body.body;

    const { Authorization } = req.body.headers
    
    const authToken = Authorization.split(" ")[1]

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
