const { verifyToken } = require('../utils/jwt');

const authentication = async (req, res, next) => {
    try {
        let { authorization } = req.headers
        if (!authorization) throw { name: "Unauthorized" }

        const access_token = authorization.split(' ')[1]

        const payload = verifyToken(access_token)

        if (!payload) throw { name: "Unauthorized"}

        next()
    } catch (error) {
        next(error)
    }
}

module.exports = authentication
