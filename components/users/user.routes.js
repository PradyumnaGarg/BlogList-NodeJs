const userRouter = require('express').Router();
const User = require('./user.model');
const bcrypt = require('bcrypt');
const ErrorGenerator = require('../../utils/error_generator');

userRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { _id: 1, author: 1, title: 1, url: 1 });
    response.json(users);
});

userRouter.post('/', async (request, response) => {
    const { username, password, name } = request.body;

    if (!password) {
        throw new ErrorGenerator(400, 'Password is missing in the request body.');
    }
    
    if (password.length < 3) {
        throw new ErrorGenerator(400, 'Password is shorter than the minimum allowed length (3).');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await user.save();

    response.status(201).json(savedUser);
});


module.exports = userRouter;
