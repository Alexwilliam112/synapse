const errorHandler = (error, req, res, next) => {
    let statusCode = 500
    let message = 'Internal Server Error'
    
    if (error.name === 'BadRequest'){
        statusCode = 400
        message = 'Bad Request'
    }

    if (error.name === 'Invalid'){
        statusCode = 401
        message = 'Invalid'
    }

    if (error.name === "Unauthorized"){
        statusCode = 401
        message = "Invalid Access Token"
    }

    console.log(error);
    res.status(statusCode).json({
        message
    })
}

module.exports = errorHandler