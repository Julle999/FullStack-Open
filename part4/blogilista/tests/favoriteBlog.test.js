//const {test, describe} = require('node:test')
//const assert = require('node:assert')
//const favoriteBlog = require('../utils/list_helper').favoriteBlog
//const material = require('./list')
//
//
//describe('Favorite Blog', () => {
//
//    test('of empty list empty object', () => {
//        const result = favoriteBlog([])
//        assert.deepStrictEqual(result, {})
//    })
//    
//    test('of list of blogs is correct blog-object', () => {
//        const result = favoriteBlog(material.blogs)
//        assert.deepStrictEqual(result, material.blogWithMostLikes)
//    })
//})