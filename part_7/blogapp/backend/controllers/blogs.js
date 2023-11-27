const express = require('express');
const blogsRouter = express.Router();
const Blog = require('../models/blogs');
const Comment = require('../models/comments');
const User = require('../models/users');

const userPopulationFields = { username: 1, name: 1, id: 1 };
function populateUser() {
    return Blog.find({}).populate('user', userPopulationFields);
}

function asyncHandler(fn) {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (e) {
            next(e);
        }
    };
}

blogsRouter.get('/', asyncHandler(async (_, res) => {
    res.json(await populateUser());
}));

blogsRouter.delete('/:id', asyncHandler(async (req, res) => {
    const { user, params } = req;
    const blog = await Blog.findById(params.id);
    if (blog && blog.user.toString() === user.id.toString()) {
        await Blog.findByIdAndRemove(params.id);
        res.status(204).json(blog);
    } else {
        res.status(403).json({ error: 'Operation not allowed.' });
    }
}));

blogsRouter.get('/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    res.json(await Blog.findById(id).populate('user', userPopulationFields));
}));

blogsRouter.post('/', asyncHandler(async (req, res) => {
    const { user, body } = req;
    if (!body.title || !body.url) {
        res.status(400).json({ message: `Missing property: ${body.url ? 'url' : 'title'}` });
    } else {
        const existingUser = await User.findById(user.id);
        const blog = new Blog({ ...body, user: existingUser.id });
        const result = await blog.save();
        existingUser.blogs.push(result._id);
        await existingUser.save();
        res.status(201).json(result);
    }
}));

blogsRouter.put('/:id', asyncHandler(async (req, res) => {
    const { body: { user: { id: userId }, ...restBody }, params: { id } } = req;
    const updatedBlogPost = await Blog.findByIdAndUpdate(id, { user: userId, ...restBody }, { new: true });
    res.json(updatedBlogPost);
}));

blogsRouter.post('/:id/comments/', asyncHandler(async (req, res) => {
    const { text } = req.body;
    const { id } = req.params;
    if (!text) {
        res.status(400).json({ message: 'Missing comment text' });
    } else {
        const comment = new Comment({ text, blogId: id });
        res.status(201).json(await comment.save());
    }
}));

blogsRouter.get('/:id/comments/', asyncHandler(async (req, res) => {
    res.json(await Comment.find({ blogId: req.params.id }));
}));

module.exports = blogsRouter;
