const jwt = require(`jsonwebtoken`)
const secretKey = process.env.SERVER_KEY

const verifyToken = (token) => {
    return jwt.verify(token, secretKey)
}

module.exports = { verifyToken }