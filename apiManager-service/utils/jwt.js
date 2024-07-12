const jwt = require(`jsonwebtoken`)
const secretKey = process.env.SECRET_KEY

const signToken = () => {
    const payload = {
        email: "user1@gmail.com",
        Companyid: 1,
        companyName: "Company Name"
    }
    return jwt.sign(payload, secretKey)
}

const verifyToken = (token) => {
    return jwt.verify(token, secretKey)
}

module.exports = { signToken, verifyToken }