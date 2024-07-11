'use strict'
const jwt = require('jsonwebtoken')
const CLIENT_KEY = process.env.CLIENT_KEY
const SERVER_KEY = process.env.SERVER_KEY

module.exports = {
    signTokenServer: (payload) => {
        return jwt.sign(payload, SERVER_KEY)
    },

    verifyTokenClient: (token) => {
        return jwt.verify(token, CLIENT_KEY)
    },

    signTokenClient: (payload) => {
        return jwt.sign(payload, CLIENT_KEY)
    }
}