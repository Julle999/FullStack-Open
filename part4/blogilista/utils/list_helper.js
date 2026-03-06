const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return(blogs.reduce((sum, blog) => {
        return sum + blog.likes
    }, 0))
}


const favoriteBlog = (blogs) => {
    const blogWithMostLikes = blogs.reduce((most,blog)=>{
        //console.log('blog',blog.likes)
        //console.log('most',most.likes)
        return blog.likes > most.likes ? blog : most
    },{
        _id: "1",
        likes: 0,
    })
    
    return blogWithMostLikes._id !== "1" ? blogWithMostLikes: {}
}

//favoriteBlog(require('../tests/list').blogs)
//console.log(favoriteBlog(require('../tests/list').blogs))

module.exports = { dummy, totalLikes, favoriteBlog }