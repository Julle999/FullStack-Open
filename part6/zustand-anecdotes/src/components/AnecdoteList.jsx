import { useAnecdotes, useAnecdoteActions } from "../store"

const AnecdoteList = () => {
    const anecdotes = useAnecdotes()
    const { addVote, deleteAnecdote } = useAnecdoteActions()
    

    const deleteButton = (id) => {
        return (
            <div>
                <button onClick={() => deleteAnecdote(id)}>delete</button>
            </div>
        )
    }
    return (
        <div>
            {anecdotes.map(anecdote => (
                <div key={anecdote.id}>
                  <div>{anecdote.content}</div>
                  <div>
                    has {anecdote.votes}
                    <button onClick={() => addVote(anecdote.id)}>vote</button>
                    {anecdote.votes === 0 && deleteButton(anecdote.id)}
                  </div>
                </div>
            ))}
        </div>
    )
}

export default AnecdoteList