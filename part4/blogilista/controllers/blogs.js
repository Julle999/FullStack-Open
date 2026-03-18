const blogsRouter = require('express').Router()
const { request, response } = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')

blogsRouter.get('/', async (request, response) => {
  
  const blogs = await Blog
    .find({})
    .populate('user', {username: 1, name: 1, id: 1})  

  logger.info(blogs)
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  if (!body.title || !body.url) {
    response.status(400).end()
  }
  const user = await User.findOne({})
  const blog = new Blog({ ...body, user: user._id})

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)      
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  const deleted = await Blog.findByIdAndDelete(id)
  
  if (!deleted) {
    console.log("Dokumenttia ei löytynyt.")
    response.status(400).end()
  }
  //console.log('tässä vastaus',vastausTietokannalta)
  response.status(204).end()
})

module.exports = blogsRouter