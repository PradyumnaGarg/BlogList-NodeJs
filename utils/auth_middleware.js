const ErrorGenerator = require("./error_generator");
const User = require('../components/users/user.model');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require("./config");
const { info } = require("./logger");


const userExtractor = async (request, response, next) => {
    const token = request.headers.authorization.split(' ')[1];
    const { id } = jwt.verify(token, JWT_SECRET);
    if (!token || !id) {
        next(new ErrorGenerator(401, 'Token is missing or invalid'));
    }

    const user = await User.findById(id);
    request.user = user;
    info('User', user);
    next();
}

module.exports = {
    userExtractor
}
