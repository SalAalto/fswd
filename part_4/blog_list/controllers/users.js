const passwordEncryption = require('bcrypt');
const expressUserRouter = require('express').Router();
const UserProfile = require('../models/users');

// Helper function to check for password validity
const isValidPassword = (pwd) => pwd && pwd.length >= 3;

// Register a new user
expressUserRouter.post('/', async (req, res) => {
    const { username, name, password } = req.body;
    // Check for password validity
    if (!isValidPassword(password)) {
        return res.status(400).json({
            error: 'Password should have at least three characters.'
        });
    }

    // Ensure the username is unique
    const userExists = await UserProfile.findOne({ username });
    if (userExists) {
        return res.status(400).json({
            error: 'The chosen username is already taken.'
        });
    }

    // Check for username length
    if (username.length < 3) {
        return res.status(400).json({
            error: 'Username should be at least three characters long.'
        });
    }

    // Encrypt the password
    const saltValue = 10;
    const encryptedPassword = await passwordEncryption.hash(password, saltValue);

    // Create and save the new user profile
    const newUser = new UserProfile({
        username,
        name,
        passwordHash: encryptedPassword,
    });

    const registeredUser = await newUser.save();

    res.status(201).json(registeredUser);
});

// Retrieve all users and their blogs
expressUserRouter.get('/', async (req, res) => {
    const allUsers = await UserProfile.find({})
        .populate('blogs', { url: 1, title: 1, author: 1, id: 1 });
    res.json(allUsers);
});

module.exports = expressUserRouter;
