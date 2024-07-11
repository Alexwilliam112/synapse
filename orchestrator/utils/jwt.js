'use strict'
const jwt = require('jsonwebtoken')
const CLIENT_KEY = process.env.CLIENT_KEY
const SERVER_KEY = process.env.SERVER_KEY
const USER_KEY = process.env.USER_KEY

module.exports = {
    signTokenServer: (payload) => {
        return jwt.sign(payload, SERVER_KEY)
    },

    signTokenUser: (payload) => {
        return jwt.sign(payload, USER_KEY)
    },

    signTokenClient: (payload) => {
        return jwt.sign(payload, CLIENT_KEY)
    },

    verifyTokenClient: (token) => {
        return jwt.verify(token, CLIENT_KEY)
    },
}