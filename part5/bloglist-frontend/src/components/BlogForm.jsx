import { useState } from 'react'

const BlogForm = ({createBlog}) => {
    //onSubmit, title, author, url, titleOnChange, authorOnChange, urlOnChange 
    const [ url, setUrl ] = useState('')
    const [ author, setAuthor ] = useState('')
    const [ title, setTitle ] = useState('')
    
    const addBlog = (event) => {
        event.preventDefault()
        const blogObject = {
            title,
            url,
            author
        }
        setUrl('')
        setTitle('')
        setAuthor('')
        createBlog(blogObject)
    }

    return (
        <div>
            <h2>create blog</h2>
            <form onSubmit={addBlog}>
                <div>
                    <label>title:
                        <input 
                            type="text" 
                            value={title} 
                            onChange={event => setTitle(event.target.value)} 
                        />
                    </label>
                </div>
                <div>
                    <label>author: 
                        <input 
                            type="text" 
                            value={author} 
                            onChange={event => setAuthor(event.target.value)} 
                        />
                    </label>
                </div>
                <div>
                    <label>url: 
                        <input 
                            type="text" 
                            value={url} 
                            onChange={event => setUrl(event.target.value)} 
                        />
                    </label>
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default BlogForm