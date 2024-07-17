'use strict'
module.exports = {
    authentication: async (req, res, next) => {
        try {
            const { authorization } = req.headers
            if (!authorization) throw { name: 'Unauthorized' }

            if (authorization !== '1234567890') {
                throw { name: 'Unauthorized' }
            }

            next()

        } catch (err) {
            next(err)
        }
    }
}