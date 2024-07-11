const bcrypt = require('bcryptjs')

const hash = (pass) => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(pass, salt)
}

module.exports = { hash }