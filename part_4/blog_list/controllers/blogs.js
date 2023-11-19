// Import necessary modules
const expressBlogRouter = require('express').Router();
const BlogPost = require('../models/blogs');
const UserProfile = require('../models/users');

// Fetch all blog entries
expressBlogRouter.get('/', async (_, res) => {
    const allBlogs = await BlogPost.find({}).populate('user', { username: 1, name: 1, id: 1 });
    res.json(allBlogs);
});

// Delete a specific blog entry by ID
expressBlogRouter.delete('/:blogId', async (req, res) => {
    const currentUser = req.user;
    const targetBlog = await BlogPost.findById(req.params.blogId);

    if (targetBlog?.user.toString() === currentUser.id.toString()) {
        await BlogPost.findByIdAndDelete(req.params.blogId);
        res.status(204).end();
    } else {
        res.status(403).json({ error: 'Unauthorized operation.' });
    }
});

// Create a new blog entry
expressBlogRouter.post('/', async (req, res) => {
    const currentUser = req.user;
    const { title, url } = req.body;

    if (!title || !url) {
        return res.status(400).json({ message: `Required property missing: ${url ? 'url' : 'title'}` });
    }

    const foundUser = await UserProfile.findById(currentUser.id);
    const newBlog = new BlogPost({ ...req.body, user: foundUser._id });
    const savedBlog = await newBlog.save();

    foundUser.blogs.push(savedBlog._id);
    await foundUser.save();

    res.status(201).json(savedBlog);
});

// Update a specific blog entry by ID
expressBlogRouter.put('/:blogId', async (req, res, next) => {
    console.log(req.body)
    const { body: { user: { id: userId }, likes, author, title, url }, params: { id } } = req;
    const post = {
        user: userId,
        likes,
        author,
        title,
        url
    }
    const modifiedBlog = await BlogPost.findByIdAndUpdate(req.params.blogId, post, { new: true });
    res.json(modifiedBlog);
});

// Export the router for use in other modules
module.exports = expressBlogRouter;
