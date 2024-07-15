'use strict'

module.exports = {
    errorHandler: (err, req, res, next) => {

        let status = 500
        let message = 'Internal server error'
        
        if(err.name === 'SequelizeValidationError') {
            status = 400
            message = err.errors[0].message
        }

        if(err.name === 'SequelizeDatabaseError') {
            status = 400
            message = 'Invalid Data Type'
        }

        if(err.name === 'SequelizeForeignKeyConstraintError') {
            status = 400
            message = 'Invalid Data Type'
        }

        if(err.name === 'SequelizeUniqueConstraintError') {
            status = 400
            message = err.errors[0].message
        }

        if(err.name === 'Unauthorized') {
            status = 401
            message = 'Invalid token'
        }

        if(err.name === 'AccountNotFound') {
            status = 401
            message = 'Invalid email/password'
        }

        if(err.name === 'JsonWebTokenError') {
            status = 401
            message = 'Invalid token'
        }

        if(err.name === 'Forbidden') {
            status = 403
            message = 'You are not authorized'
        }

        if(err.name === 'NotFound') {
            status = 404
            message = `Data not found`
        }

        res.status(status).json({
            message,
            msg: err.message
        })
    }
}