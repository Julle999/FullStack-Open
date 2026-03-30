const testRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')
const { response } = require('../app')

testRouter.post('/reset', async () => {
    await User.deleteMany({})
    await Blog.deleteMany({})

    response.status(204).end()
})


module.exports = testRouter