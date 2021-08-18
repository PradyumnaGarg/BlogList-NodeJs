const logger = require('./logger');

const requestLogger = (request, response, next) => {
    logger.info('Method: ', request.method);
    logger.info('Path:   ', request.path);
    logger.info('Body:   ', request.body);
    logger.info('----');
    next();
};

const unknownEnpoint = (request, response) => {
    response.status(404).send({error: 'Unkonwn endpoint'});
}

const errorHandler = (error, request, response, next) => {
    if(error.status) {
        response.status(error.status).send({error: error.message});
    } else if (error.message) {
        response.status(400).send({error: error.message});
    } else {
        response.status(500).send({error: 'Internal server error'});
    }
    next();
}

module.exports = {
    requestLogger,
    unknownEnpoint,
    errorHandler
}