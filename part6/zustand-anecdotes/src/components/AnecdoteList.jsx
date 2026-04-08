import { useAnecdotes, useAnecdoteActions } from "../store"

const AnecdoteList = () => {
    const anecdotes = useAnecdotes()
    const { addVote } = useAnecdoteActions()

    const vote = id => {
        addVote(id)
    }

    //const anecdotesToShow = anecdotes.toSorted((a,b) => b.votes - a.votes)
    
    return (
        <div>
            {anecdotes.map(anecdote => (
                <div key={anecdote.id}>
                  <div>{anecdote.content}</div>
                  <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                  </div>
                </div>
            ))}
        </div>
    )
}

export default AnecdoteList