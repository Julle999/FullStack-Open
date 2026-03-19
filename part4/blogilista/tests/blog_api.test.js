const {test, after, beforeEach} = require('node:test')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const Blog = require('../models/blog')
const User = require('../models/user')
const lists = require('./list')
const { blogsInDB } = require('./test_helper')

const api = supertest(app)


//let token = 'Bearer ' 
//let addedUser = null

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(lists.blogs)
    await User.deleteMany({})
    //const passwordHash = await bcrypt.hash('salainen', 10)
    //const user = new User({
    //    username: "uusi user",
    //    name: "uuseri",
    //    passwordHash
    //})
    //addedUser = await user.save()
    //const vastaus = await api
    //    .post('/api/login')
    //    .send({username: user.username, password: 'salainen'})
    //    .set('Content-type', 'application/json')
    //token = 'Bearer ' + vastaus.body.token
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
    //-------------ALUSTUS------------------
    const passwordHash = await bcrypt.hash('salainen', 10)
    const user = new User({
        username: "uusi user",
        name: "uuseri",
        passwordHash
    })
    const addedUser = await user.save()
    const vastaus = await api
        .post('/api/login')
        .send({username: user.username, password: 'salainen'})
        .set('Content-type', 'application/json')
    const token = 'Bearer ' + vastaus.body.token

//----------------------------------------------------------------

    const newBlog = lists.oneNewBlog
    const blogsAtStart = await blogsInDB()
    const addedBlog = await api
        .post('/api/blogs')
        .set('Authorization', token)
        .set('Content-Type', 'application/json')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    
    const blogsAtEnd =  await blogsInDB()
    assert.deepStrictEqual(blogsAtEnd.length, blogsAtStart.length + 1)

    //const titles = blogsAtEnd.map(b => b.title)
    assert.deepStrictEqual(addedBlog.body, {...newBlog, id: addedBlog.body.id, user: addedUser.id})
})

test.only('blog w/o token can not be added to DB', async () => {
    const newBlog = lists.oneNewBlog
    //console.log('uusi blogi',newBlog)
    const blogsAtStart = await blogsInDB()
    const addedBlog = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/)

    
    const blogsAtEnd =  await blogsInDB()
    assert.deepStrictEqual(blogsAtEnd.length, blogsAtStart.length)

    const titles = blogsAtEnd.map(b => b.title)
    assert.deepStrictEqual(addedBlog.body, { error: 'token missing or invalid' })
})

test('adding blog with no likes has 0 likes', async () =>{
    //-------------ALUSTUS------------------
    const passwordHash = await bcrypt.hash('salainen', 10)
    const user = new User({
        username: "uusi user",
        name: "uuseri",
        passwordHash
    })
    const addedUser = await user.save()
    const vastaus = await api
        .post('/api/login')
        .send({username: user.username, password: 'salainen'})
        .set('Content-type', 'application/json')
    const token = 'Bearer ' + vastaus.body.token

//----------------------------------------------------------------

    const newBlog = {
        title: "testi",
        author: "julle999",
        url: "osoite"
    }
    const addedBlog = await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', token)
        .expect(201)
    
    assert.strictEqual(addedBlog.body.likes, 0)
})

test('blog w/o url is not added', async () => {
    const newBlog = {
        title: "testi",
        author: "julle999"
    }

    const addedBlog = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
})

test('blog w/o title is not added', async () => {
    const newBlog = {
        author: "julle999",
        url: "osoite"
    }

    const addedBlog = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
})

test('blog can be deleted', async () => {
    
    const blogsAtStart = await blogsInDB()
    const blogToDelete = blogsAtStart[0]
    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

    const blogsAtEnd = await blogsInDB()

    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)

    const ids = blogsAtEnd.map(b => b.id)

    assert(!ids.includes(blogToDelete.id))
})

after(async () => {
  await mongoose.connection.close()
})