const { verifyToken } = require("../utils/jwt")

const verify = async (req, res, next) => {
    try {
        let { authorization } = req.headers
        if (!authorization) throw { name: "Unauthorized" }
        const access_token = authorization.split(' ')[1]
        // console.log(access_token);
        const payload = verifyToken(access_token)
        req.data = payload
        next()
    } catch (error) {
        console.log(error);
        next({
            statusCode: 400
        });
    }
}

module.exports = verify