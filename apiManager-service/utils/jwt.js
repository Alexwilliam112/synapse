const jwt = require(`jsonwebtoken`)
const secretKey = process.env.SERVER_KEY

const signToken = () => {
    const payload = {
        email: "user3@techcorp.com",
        CompanyId: 1,
        companyName: "Company Name"
    }
    // console.log(`ok`);
    return jwt.sign(payload, secretKey)
}

const verifyToken = (token) => {
    return jwt.verify(token, secretKey)
}

module.exports = { signToken, verifyToken }