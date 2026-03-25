import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
//kommentti
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  //const [title, setTitle] = useState('')
  //const [author, setAuthor] = useState('')
  //const [url, setUrl] = useState('')
  const [feedbackMessage, setFeedbackMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService
      .getAll()
      .then( blogs => setBlogs( blogs ))  
  }, [])

  useEffect(()=>{
    const loggedUserJOSN = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJOSN) {
      const user = JSON.parse(loggedUserJOSN)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('loggin in with', username, password)
    try {
      const user = await loginService.login({username, password})
      setUser(user)
      setUsername('')
      setPassword('')
      window.localStorage.setItem('loggedBlogAppUser',JSON.stringify(user))
      blogService.setToken(user.token)
      setIsError(false)
      setFeedbackMessage(`logged in`)
      setTimeout(()=>{
        setFeedbackMessage(null)
      },5000)
    } catch (err) {
      console.log(err.error)
      setIsError(true)
      setFeedbackMessage(`wrong username or password`)
      setTimeout(()=>{
        setFeedbackMessage(null)
      },5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    console.log('loggin out')
    window.localStorage.clear()
    setUser(null)
    blogService.setToken(null)
  }
  //const handleTitleChange = (event) => {
  //  setTitle(event.target.value)
  //  //console.log(event.target.value)
  //}
//
  //const handleAuthorChange = (event) => {
  //  setAuthor(event.target.value)
  //  //console.log(event.target.value)
  //}
//
  //const handleUrlChange = (event) => {
  //  setUrl(event.target.value)
  //  //console.log(event.target.value)
  //}

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    //console.log(user)
    
    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog))
        //setTitle('')
        //setAuthor('')
        //setUrl('')
        setFeedbackMessage(`a new blog: ${returnedBlog.title} by ${returnedBlog.author} added`)
        setIsError(false)
        setTimeout(() => {
          setFeedbackMessage(null)
        }, 5000)
      })
    //console.log(blogObject)
  }

  const modify = (changedBlog) => {
    const id = changedBlog.id
    //console.log(id)
    //console.log('!!!!APP', changedBlog)
    blogService
      .update(changedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map( b => b.id !== id ? b : returnedBlog))
      }) 
    //console.log(changedBlog)
    //const changedBlog = {...blog, likes: blog.likes+1}
    
    //setNotes(notes.map(n => n.id !== id ? n : returnedNote))
    

  }

  const blogForm = () => {
    return (
      <div>
        <Togglable buttonLabel='new blog' ref={blogFormRef}>
          <BlogForm 
            createBlog={addBlog}
          />
        </Togglable>
      </div>
    )
  }

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification isError={isError} message={feedbackMessage}/>
        <form onSubmit={handleLogin}>
          <div>
            <label>
              username
              <input 
              type="text" 
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              password
              <input 
                type="password" 
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </label>
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h1>BlogsApp</h1>
      <Notification isError={isError} message={feedbackMessage}/>
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      {blogForm()}
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} modifyLikes={modify} />
      )}
    </div>
  )

}

export default App