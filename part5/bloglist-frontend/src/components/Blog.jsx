import {useState} from 'react'

const Blog = ({ blog, modifyLikes }) => {
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
    const blogObject = {...blog, likes: blog.likes + 1}
    console.log('!!!!!BLOG BLOGOBJECT',blogObject)
    modifyLikes(blogObject)
  }

  const hideWhenShowAll = { display: showAll ? 'none' : '' }
  const showWhenShowAll = { display: showAll ? '' : 'none' }
  
  return (  
    <div style={blogStyle}>
      <div style={hideWhenShowAll}>
        {blog.title} - {blog.author}
        <button onClick={toggleShowAll}>view</button>
      </div>  
      <div style={showWhenShowAll}>
        {blog.title} - {blog.author}
        <button onClick={toggleShowAll}>hide</button> <br />
        {blog.url} <br />
        likes {blog.likes} 
        <button onClick={addLike}>like</button> <br />
        {blog.user.name}<br />
      </div>
    </div>
  )
}

export default Blog