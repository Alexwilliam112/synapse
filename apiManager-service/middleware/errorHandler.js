
const errorHandler = (error, req, res, next) => {
    if (!error) {
        error = {
            status: 500,
            message: 'Internal Server Error'
        }
    }
    res.status(error.statusCode).json(
        error
    )
}

module.exports = errorHandler