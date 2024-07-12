const { signToken, verifyToken } = require("../utils/jwt")

const verify = async (req, res, next) => {
    try {
        let { authorization } = req.headers
        authorization = "Bearer " + signToken()
        if (!authorization) throw { name: "Unauthorized" }
        const access_token = authorization.split(' ')[1]
        const payload = verifyToken(access_token)
        req.data = payload
        next()
    } catch (error) {
        next({
            statusCode: 400
        });
    }
}

module.exports = verify