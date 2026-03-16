const logger = require('./logger')

const errorHandler = ( error, request, response, next ) => {
    //console.log(error)
    logger.error(error)

    if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
}

module.exports = { errorHandler }