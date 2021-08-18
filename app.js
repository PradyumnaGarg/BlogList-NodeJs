require('./mongo');
const express = require('express')
require('express-async-errors');
const app = express()
const cors = require('cors')
const blogsRouter = require('./components/Blogs/blog.routes');
const middlewares = require('./utils/middlewares');
const userRouter = require('./components/users/user.routes');

app.use(cors())
app.use(express.json())

app.use(middlewares.requestLogger);
app.use('/api/blogs', blogsRouter);
app.use('/api/users', userRouter);

app.use(middlewares.unknownEnpoint);
app.use(middlewares.errorHandler);

module.exports = app;
