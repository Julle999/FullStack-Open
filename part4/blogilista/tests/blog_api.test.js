const {test, after, beforeEach} = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const Blog = require('../models/blog')
const lists = require('./list')
const blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(lists.blogs)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    assert.strictEqual(6, response.body.length)
})

test.only('Blogs id field is id', async () => {
    const response = await api.get('/api/blogs')
    
    const hasId = ('id' in response.body[0]) ? true : false
    assert.strictEqual(hasId, true)
})

after(async () => {
    await mongoose.connection.close()
})