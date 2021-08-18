const userRouter = require('express').Router();
const User = require('./user.model');
const bcrypt = require('bcrypt');
const ErrorGenerator = require('../../utils/error_generator');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../utils/config');

userRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { _id: 1, author: 1, title: 1, url: 1 });
    response.json(users);
});

userRouter.post('/register', async (request, response) => {
    const { username, password, name } = request.body;
    if (!password) {
        throw new ErrorGenerator(400, 'Password is missing in the request body.');
    }
    if (password.length < 3) {
        throw new ErrorGenerator(400, 'Password is shorter than the minimum allowed length (3).');
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({username, name, passwordHash})
    const savedUser = await user.save();
    response.status(201).json(savedUser);
});

userRouter.post('/login', async (request, response) => {
    const { username, password } = request.body;
    const user = await User.findOne({username})
    const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash);
    if (!(user && passwordCorrect)) {
        throw new ErrorGenerator(400, 'Incorrect username or password');
    }
    const token = jwt.sign({id: user._id}, JWT_SECRET);
    response.json({token, username, name: user.name});
})

module.exports = userRouter;
