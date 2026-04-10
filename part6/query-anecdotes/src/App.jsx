import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useAnecdotes } from './hooks/useAnecdotes'
import useNotification from './hooks/useNotification'

const App = () => {
  
  const { anecdotes, isPending, isError, error, vote } = useAnecdotes()
  const { setMessage } = useNotification()

  if (isPending) {
    return <div>loading data..</div>
  }
  
  if (isError) {
    setMessage(error)
    console.log('Error:',error)
    return <div><strong>anecdote service not available due to problems in server</strong></div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App