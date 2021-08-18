const blogsRouter = require('express').Router();
const Blog = require('./blog.model');
const User = require('../users/user.model');
const ErrorGenerator = require('../../utils/error_generator');
const { userExtractor } = require('../../utils/auth_middleware');

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, _id: 1 });
  return response.json(blogs);
});

blogsRouter.post("/", userExtractor, async (request, response) => {
    const blog = new Blog(request.body);
    blog.user = request.user._id;
    const savedBlog = await blog.save();
    const user = await User.findById(request.user._id);
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.status(201).json(savedBlog);
});

blogsRouter.put("/:id", async (request, response) => {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, {...request.body});
    if (!updatedBlog) {
      throw new ErrorGenerator(400, 'Request not well formed');
    }
    response.status(200).json({blog: updatedBlog});
});

blogsRouter.delete("/:id", async (request, response) => {
    const deleteResponse = await Blog.findByIdAndDelete(request.params.id);
    if (!deleteResponse) {
      throw new ErrorGenerator(404, 'Unknown id');
    }
    response.status(204).json();
});

module.exports = blogsRouter;
