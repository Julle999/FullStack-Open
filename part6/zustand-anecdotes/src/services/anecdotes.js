const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await fetch(baseUrl)

    if (!response.ok) {
        throw new Error('failed to load anecdotes')
    }

    return await response.json()
}

const createNew = async (content) => {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, votes: 0 })
    }

    const response = await fetch(baseUrl, options)

    if (!response.ok) {
        throw new Error('Failed to create new anecdote!')
    }

    return await response.json()
}

const update = async ( id, anecdote) => {
    const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(anecdote)
    }

    const response = await fetch(`${baseUrl}/${id}`, options)

    if (!response.ok) {
        throw new Error('failed to update anecdote')
    }

    return await response.json()
}

const deleteAnecdote = async (id) => {
    const options = {
        method: 'DELETE'
    }
    
    const response = await fetch(`${baseUrl}/${id}`, options)

    if (!response.ok) {
        throw new Error('failed to delete anecdote')
    }

    return response
} 

export default { getAll, createNew, update, deleteAnecdote }