const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const express = require('express');
const loginRouter = express.Router();
const User = require('../models/users');

async function authenticate(username, password) {
    const user = await User.findOne({ username });
    if (!user) {
        return null;
    }

    const passwordCorrect = await bcrypt.compare(password, user.passwordHash);
    return passwordCorrect ? user : null;
}

function generateToken(user) {
    const userForToken = {
        username: user.username,
        id: user._id,
    };

    return jwt.sign(userForToken, process.env.SECRET);
}

loginRouter.post('/', async (req, res) => {
    const { username, password } = req.body;
    const user = await authenticate(username, password);

    if (!user) {
        return res.status(401).json({ error: 'invalid username or password' });
    }

    const token = generateToken(user);
    res.status(200).send({
        token,
        username: user.username,
        name: user.name,
        id: user._id,
    });
});

module.exports = loginRouter;
