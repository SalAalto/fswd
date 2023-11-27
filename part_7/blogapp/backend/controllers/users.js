const bcrypt = require('bcryptjs');
const express = require('express');
const usersRouter = express.Router();
const User = require('../models/users');

// Helper function for user validation
async function validateUser(username, password) {
    if (!password || password.length < 3) {
        throw new Error('Password length should be at least three characters long.');
    }
    if (username.length < 3) {
        throw new Error('Username should be at least three characters long.');
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        throw new Error('Username must be unique');
    }
}

// Helper function for hashing password
async function hashPassword(password) {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
}

// User routes
usersRouter.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).populate('blogs', {
            url: 1, title: 1, author: 1, id: 1,
        });
        res.json(user);
    } catch (error) {
        next(error);
    }
});

usersRouter.post('/', async (req, res, next) => {
    try {
        const { username, name, password } = req.body;
        await validateUser(username, password);
        const passwordHash = await hashPassword(password);

        const user = new User({ username, name, passwordHash });
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

usersRouter.get('/', async (req, res, next) => {
    try {
        const users = await User.find({}).populate('blogs', {
            url: 1, title: 1, author: 1, id: 1,
        });
        res.json(users);
    } catch (error) {
        next(error);
    }
});

module.exports = usersRouter;
