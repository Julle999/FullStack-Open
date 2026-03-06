const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const material = require('./list')


describe('Dummy', () => {
    test('dummy returns one', () => {
      const blogs = []

      const result = listHelper.dummy(blogs)
      assert.strictEqual(result, 1)
    })
})

describe('Favorite Blog', () => {

    test('of empty list empty object', () => {
        const result = listHelper.favoriteBlog([])
        assert.deepStrictEqual(result, {})
    })
    
    test('of list of blogs is correct blog-object', () => {
        const result = listHelper.favoriteBlog(material.blogs)
        assert.deepStrictEqual(result, material.blogWithMostLikes)
    })
})

describe('total likes', () => {

    test('when list has only one Blog equals the likes of that', () => {
        const result = listHelper.totalLikes(material.listWithOneBlog)
        assert.strictEqual(result, 4)
    })

    test('of array of two blogs is calculated right' , () => {
        assert.strictEqual(listHelper.totalLikes(material.listWithTwoBlogs), 8)
    })

    test('of empty array return 0' , () => {
        assert.strictEqual(listHelper.totalLikes([]), 0)
    })

    test('of big array returns coreect value' , () => {
        assert.strictEqual(listHelper.totalLikes(material.blogs), 36)
    })
})