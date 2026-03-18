const usersRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.post('/', async (request, response) => {
    const {username, name, password} = request.body

    if (!password || password.length < 3) {
        response.status(400).json({ error: 'password too short or missing' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash,

    })
    
    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({})
        .populate('blogs', {user: 0, likes: 0})

    response.status(200).json(users)
})

module.exports = usersRouter