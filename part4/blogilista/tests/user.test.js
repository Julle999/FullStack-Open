const {test, after, beforeEach} = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const Blog = require('../models/blog')
const User = require('../models/user')
const lists = require('./list')
//const blog = require('../models/blog')
const { usersInDB } = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany([])
})

test.only('user w/ valid username and password is created and added to DB', async () => {
    const usersAtStart = await usersInDB()
    const user = {
            username: "Maikki1",
            name: "name1",
            password: "erittainsalainen1"
        }
    
    await api
        .post('/api/users')
        .send(user)
        .expect(201)

    const usersAtEnd = await usersInDB()
    assert.strictEqual(usersAtStart.length + 1, usersAtEnd.length)
})

test.only('user w/ invalid username is not created', async () => {
    const user = {
            username: "Ma",
            name: "name1",
            password: "erittainsalainen1"
        }
    
    const result = await api
        .post('/api/users')
        .send(user)
        .expect(400)

    assert(result.body.error.includes('is shorter than the minimum allowed length'))
})

test.only('user w/ no username is not created', async () => {
    const user = {
            name: "name1",
            password: "erittainsalainen1"
        }
    
    const result = await api
        .post('/api/users')
        .send(user)
        .expect(400)

    assert(result.body.error.includes('is required'))
})

test.only('user w/ invalid password is not created', async () => {
    const user = {
            username: "Maikki2",
            name: "name1",
            password: "er"
        }
    
    const result = await api
        .post('/api/users')
        .send(user)
        .expect(400)
    
    assert(result.body.error === 'password too short or missing')
})

test.only('user w/ no password is not created', async () => {
    const user = {
            username: "MAikki1",
            name: "name1"
        }
    
    const result = await api
        .post('/api/users')
        .send(user)
        .expect(400)

    assert(result.body.error.includes('password too short or missing'))
})

after(async () => {
  await mongoose.connection.close()
})