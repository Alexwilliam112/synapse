const { verifyToken } = require("../utils/jwt")

const verify = async (req, res, next) => {
    try {
        const bodyToken = req.body.payload;

        const { authorization } = req.headers

        const authToken = authorization.split(' ')[1]

        if (!authToken) throw { name: "Invalid" };

        let bodyDecoded
        if (bodyToken) {
            bodyDecoded = verifyToken(bodyToken);
            req.body = bodyDecoded;
        }

        const authDecoded = verifyToken(authToken);

        req.loginInfo = authDecoded

        next()
    } catch (error) {
        next({
            statusCode: 400
        });
    }
}

module.exports = verify