"use strict";
const jwt = require("jsonwebtoken");
const SERVER_KEY = process.env.SERVER_KEY;

module.exports = {
  signTokenServer: (payload) => {
    return jwt.sign(payload, SERVER_KEY);
  },

  verifyTokenServer: (token) => {
    return jwt.verify(token, SERVER_KEY);
  },
};
