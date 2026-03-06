const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
//const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')
const morgan = require('morgan')


const app = express()
mongoose.connect(config.MONGODB_URI_BLOGLIST, { family: 4 })
    .then( () => {
        logger.info('connected to mongoDB')
    })
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.json())
app.use('/api/blogs', blogsRouter)


module.exports = app