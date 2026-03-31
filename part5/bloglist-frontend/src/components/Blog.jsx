import { useState } from 'react'

const Blog = ({ blog, modifyLikes, user, deleteBlog }) => {
  const [showAll, setShowAll] = useState(false)
  //console.log('!!!!BLOG',blog)
  const blogStyle = {
    border: 'solid',
    borderWidth: 2,
    borderRadius: 3,
    marginBottom: 5,
    paddingTop: 10,
    paddingLeft: 5,

  }

  const toggleShowAll = () => {
    setShowAll(!showAll)
  }

  const addLike = (event) => {
    event.preventDefault()
    //const likes = blog.likes +1
    //const blogObject = {...blog, likes}
    const blogObject = { ...blog, likes: blog.likes + 1 }
    //console.log('!!!!!BLOG BLOGOBJECT',blogObject)
    modifyLikes(blogObject)
  }

  const removeBlog = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      //console.log(`Removing blog: ${blog.title}`)
      deleteBlog(blog.id)
    }
  }

  const hideWhenShowAll = { display: showAll ? 'none' : '' }
  const showWhenShowAll = { display: showAll ? '' : 'none' }

  return (
    <div style={blogStyle}>
      <div style={hideWhenShowAll}>
        <label placeholder='here is title' id='hideWhenShowall'>
          {blog.title} - {blog.author}
        </label>
        <button onClick={toggleShowAll}>view</button>
      </div>
      <div style={showWhenShowAll} id='showWhenShowall'>
        <div id='titleAndAuthor'>
          {blog.title} - {blog.author}
          <button onClick={toggleShowAll}>
            hide
          </button>
        </div>
        <div id='url'>
          {blog.url}
        </div>
        <div id='likes'>
          likes {blog.likes}
          <button onClick={addLike}>like</button>
        </div>
        <div id='usersName'>
          {blog.user.name}
        </div>
        {user.username === blog.user.username && (
          <button onClick={removeBlog}>remove</button>
        )}
      </div>
    </div>
  )
}

export default Blog