const errorHandler = (error, req, res, next) => {
    let status = 500
    let message = 'Internal Server Error'

    if (error.name === 'UserNotFound'){
        status = 404
        message = 'User Not Found'
    }

    if (error.name === 'BadRequest'){
        status = 404
        message = 'Bad Request'
    }

    res.status(status).json({
        message
    })
}

module.exports = errorHandler