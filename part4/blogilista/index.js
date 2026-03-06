const app = require('./app')
//const express = require('express')

const logger = require('./utils/logger')
const config = require('./utils/config')

//const app = express()

//const blogSchema = mongoose.Schema({
//  title: String,
//  author: String,
//  url: String,
//  likes: Number,
//})

//const Blog = mongoose.model('Blog', blogSchema)

//const mongoUrl = config.MONGODB_URI_BLOGLIST
//const mongoUrl = 'mongodb://localhost/bloglist'
//mongoose.connect(mongoUrl, { family: 4 })

//app.use(express.json())



app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})