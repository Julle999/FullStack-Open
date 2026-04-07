import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { addMessage } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    //const anecdotes = useSelector(state => state.anecdotes)
    //console.log('FILTERED',anecdotes)
    const anecdotes = useSelector(state => {
        if (state.filter === '') {
            return state.anecdotes
        }

        //const filtered = state.anecdotes.filter(a => a.content.includes(state.filter))
        return state.anecdotes.filter(a => a.content.includes(state.filter))
    })

    const dispatch = useDispatch()

    const addVote = id => {
        dispatch(vote(id))
        dispatch(addMessage(`You voted blog '${anecdotes.find(a => a.id === id).content}'`))
        setTimeout(() => {
            dispatch(addMessage(''))
        }, 5000)
    }
    //console.log(anecdotes)
    return (
        <div>
            {[...anecdotes].sort((a,b) => b.votes - a.votes).map(anecdote => (
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