import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    //const anecdotes = useSelector(state => state.anecdotes)
    //console.log('FILTERED',anecdotes)
    const anecdotes = useSelector(state => {
        if (state.filter === '') {
            return state.anecdotes
        }

        const filtered = state.anecdotes.filter(a => a.content.includes(state.filter))
        return filtered
    })

    const dispatch = useDispatch()

    const addVote = id => {
        dispatch(vote(id))
    }
    return (
        <div>
            {anecdotes.sort((a,b) => b.votes - a.votes).map(anecdote => (
                <div key={anecdote.id}>
                  <div>{anecdote.content}</div>
                  <div>
                    has {anecdote.votes}
                    <button onClick={() => addVote(anecdote.id)}>vote</button>
                  </div>
                </div>
            ))}
      </div>
    )
}

export default AnecdoteList