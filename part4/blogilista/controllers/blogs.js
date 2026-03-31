const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')

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
  
  if (!body.title || !body.url) {
    return response.status(400).json({error: 'title or url missing'})
  }

  if (!request.user) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = request.user
  const blog = new Blog({ ...body, user: user._id})
  //console.log('!!!!!USER_ID',user._id)

  const savedBlog = await blog.save()
  const populatedBlog = await savedBlog.populate('user', { username: 1, name: 1, id: 1 })
  

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(populatedBlog)      
})

blogsRouter.delete('/:id', async (request, response) => {
  const blogId = request.params.id

  if (!request.user) {
    return response.status(401).json({ error: 'token invalid' })
  }
  
  const user = request.user
  const blog = await Blog.findById(blogId)
  if (!blog.user) {
    return response.status(409).json({error: 'this blog can be deleted only by admins'})
  }
  if (blog.user.toString() !== user._id.toString()) {
    return response.status(401).json({error: 'user is not permited to delete this blog'})
  }

  const deleted = await Blog.findByIdAndDelete(blogId)
  
  if (!deleted) {
    logger.error("Dokumenttia ei löytynyt.")
    return response.status(400).end()
  }
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const blogId = request.params.id
  const { title, author, url, likes, user } = request.body

  if (!request.user) {
    return response.status(401).json({ error: 'token invalid' })
  }
  
  const blog = await Blog.findById(blogId)
  //console.log('jos näyn virhe on jälkeeni')
  if (!blog) {
    return response.status(404).end()
  }
  //console.log('!!!!user',user)
  const userAgain = await User.findById(user.id)
  //console.log('!!!!',userAgain)
  blog.title = title
  blog.author = author
  blog.url = url
  blog.likes = likes
  blog.user = userAgain.id

  const updatedBlog = await blog.save()
  const populatedBlog = await updatedBlog.populate('user', { username: 1, name: 1, id: 1 })
  return response.json(populatedBlog)

})

module.exports = blogsRouter