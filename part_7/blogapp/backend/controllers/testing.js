const testingRouter = require('express').Router()
const Blog = require('../models/blogs')
const User = require('../models/users')

if (process.env.NODE_ENV === 'test') {
    testingRouter.post('/reset', async (request, response) => {
        await Blog.deleteMany({})
        await User.deleteMany({})

        response.status(204).end()
    })
}

module.exports = testingRouter
