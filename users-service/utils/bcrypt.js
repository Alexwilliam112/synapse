const bcrypt = require('bcryptjs')

const hash = (pass) => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(pass, salt)
}

const compareSync = (plainPass, hashedPass) => {
    return bcrypt.compareSync(plainPass, hashedPass);
  };
  
  module.exports = { hash, compareSync };