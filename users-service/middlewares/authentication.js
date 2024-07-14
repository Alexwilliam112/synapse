const { verifyToken } = require('../utils/jwt');
const { createToken } = require('../utils/tokenGenerator');

const authentication = async (req, res, next) => {
  try {
    let access_token = createToken()
    if (!access_token) throw { name: "Unauthorized" };

    const payload = verifyToken(access_token);
    
    if (!payload || payload.origin !== process.env.USER_ORIGIN) throw { name: "Unauthorized"}

    const bodyToken = req.body.body;

    const { Authorization } = req.body.headers
    
    const authToken = Authorization.split(" ")[1]

    if (!bodyToken || !authToken) throw { name: "Invalid" };

    const bodyDecoded = verifyToken(bodyToken);
    console.log(bodyDecoded)
    
    const authDecoded = verifyToken(authToken);

    if (authDecoded.origin !== process.env.USER_ORIGIN) throw { name: "Invalid" }

    req.bodyDecoded = bodyDecoded

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authentication };
