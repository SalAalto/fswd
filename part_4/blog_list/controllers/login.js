const jsonwebtoken = require('jsonwebtoken');
const passwordUtils = require('bcrypt');
const expressLoginRouter = require('express').Router();
const UserEntity = require('../models/users');

// Helper function for password validation
const isPasswordValid = async (inputPassword, hashedPassword) => {
    return await passwordUtils.compare(inputPassword, hashedPassword);
};

// Authenticate and login user
expressLoginRouter.post('/', async (req, res) => {
    const { username, password } = req.body;

    // Find user by username
    const fetchedUser = await UserEntity.findOne({ username });

    // Check if password is correct
    const passwordMatches = fetchedUser ? await isPasswordValid(password, fetchedUser.passwordHash) : false;

    // Handle invalid credentials
    if (!passwordMatches) {
        return res.status(401).json({
            error: 'Incorrect username or password.'
        });
    }

    // Structure data for token
    const tokenPayload = {
        username: fetchedUser.username,
        id: fetchedUser._id,
    };

    // Sign the token with a secret key
    const userToken = jsonwebtoken.sign(tokenPayload, process.env.SECRET);

    // Send the token and user details as response
    res.status(200).json({
        token: userToken,
        username: fetchedUser.username,
        name: fetchedUser.name,
        id: fetchedUser._id
    });
});

module.exports = expressLoginRouter;
