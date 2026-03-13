const blogsRouter = require('express').Router()
const { request, response } = require('../app')
const Blog = require('../models/blog')
const logger = require('../utils/logger')

blogsRouter.get('/', async (request, response) => {
  
  const blogs = await Blog.find({})
    
    logger.info(blogs)
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  if (!body.title || !body.url) {
    response.status(400).end()
  }
  
  const blog = new Blog({ ...body})

  const savedBlog = await blog.save()
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