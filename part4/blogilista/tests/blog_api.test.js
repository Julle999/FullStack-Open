const {test, after, beforeEach} = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const Blog = require('../models/blog')
const lists = require('./list')
const blog = require('../models/blog')
const { blogsInDB } = require('./test_helper')

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

test('Blogs id field is id', async () => {
    const response = await api.get('/api/blogs')
    
    const hasId = ('id' in response.body[0]) ? true : false
    assert.strictEqual(hasId, true)
})

test('blog can be added to DB', async () => {
    const newBlog = lists.oneNewBlog
    const blogsAtStart = await blogsInDB()
    const addedBlog = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    
    const blogsAtEnd =  await blogsInDB()
    assert.deepStrictEqual(blogsAtEnd.length, blogsAtStart.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    assert.deepStrictEqual(addedBlog.body, {...newBlog, id: addedBlog.body.id})
})

test('adding blog with no likes has 0 likes', async () =>{
    const newBlog = {
        title: "testi",
        author: "julle999",
        url: "osoite"
    }
    const addedBlog = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
    
    assert.strictEqual(addedBlog.body.likes, 0)
})

test.only('blog w/o url is not added', async () => {
    const newBlog = {
        title: "testi",
        author: "julle999"
    }

    const addedBlog = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
})

test.only('blog w/o title is not added', async () => {
    const newBlog = {
        author: "julle999",
        url: "osoite"
    }

    const addedBlog = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
})

after(async () => {
  await mongoose.connection.close()
})