const blogsRouter = require('express').Router()
const { request, response } = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')

//const getTokenFrom = request => {
//  const authorization = request.get('authorization')
//  if (authorization && authorization.startsWith('Bearer ')) {
//    return authorization.replace('Bearer ', '')
//  }
//  return null
//}

blogsRouter.get('/', async (request, response) => {
  
  const blogs = await Blog
    .find({})
    .populate('user', {username: 1, name: 1, id: 1})  

  logger.info(blogs)
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)
  if (!body.title || !body.url) {
    response.status(400).end()
  }
  //const user = await User.findOne({})
  const blog = new Blog({ ...body, user: user._id})

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)      
})

blogsRouter.delete('/:id', async (request, response) => {
  const blogId = request.params.id
  if (!request.token) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const blog = await Blog.findOne({_id: blogId, user: decodedToken.id})
  const deleted = await Blog.findByIdAndDelete(blogId)
  
  if (!deleted) {
    console.log("Dokumenttia ei löytynyt.")
    response.status(400).end()
  }
  response.status(204).end()
})

module.exports = blogsRouter