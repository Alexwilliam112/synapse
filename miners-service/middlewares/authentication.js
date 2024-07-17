const { verifyTokenServer } = require('../utils/jwt');

const authentication = async (req, res, next) => {
    try {
        let { authorization } = req.headers
        if (!authorization) throw { name: "Unauthorized" }

        const access_token = authorization.split(' ')[1]
        const payload = verifyTokenServer(access_token)

        if (!payload) throw { name: "Unauthorized" }

        req.userSessionId = `CLIENT-SESSION-ID-${payload.id}`
        req.loginInfo = payload
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = authentication
