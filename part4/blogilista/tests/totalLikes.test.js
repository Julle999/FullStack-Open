//const {test, describe} = require('node:test')
//const assert = require('node:assert')
//
//const totalLikes = require('../utils/list_helper').totalLikes
//const material = require('./list')
//
//describe('total likes', () => {
//
//    test('when list has only one Blog equals the likes of that', () => {
//        const result = totalLikes(material.listWithOneBlog)
//        assert.strictEqual(result, 4)
//    })
//
//    test('of array of two blogs is calculated right' , () => {
//        assert.strictEqual(totalLikes(material.listWithTwoBlogs), 8)
//    })
//
//    test('of empty array return 0' , () => {
//        assert.strictEqual(totalLikes([]), 0)
//    })
//
//    test('of big array returns coreect value' , () => {
//        assert.strictEqual(totalLikes(material.blogs), 36)
//    })
//})