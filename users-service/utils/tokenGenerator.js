const jwt = require('jsonwebtoken')
const secretKey = process.env.USER_KEY

const createToken = () => {
    const payload = {
        origin: "Orchestrator-1"
    }
    return jwt.sign(payload, secretKey)
}

module.exports = { createToken }