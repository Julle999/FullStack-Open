
import { create } from 'zustand'
import anecdoteService from './services/anecdotes'


const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: '',
  feedbackMessage: '',
  actions: {
    addVote: async (id) => {
      const anecdote = get().anecdotes.find(a => a.id === id)
      const updatedAnecdote = await anecdoteService.update(id, {...anecdote, votes: anecdote.votes +1})
      set(
        state => ({
          anecdotes: state.anecdotes.map(a => a.id === id ? updatedAnecdote : a).toSorted((a,b) => b.votes - a.votes),
          feedbackMessage: `You voted '${updatedAnecdote.content}'`
        })
      )
      setTimeout(() => {
        set(() => ({feedbackMessage: ''}))
      }, 5000)
    },
    add: async (content) => {
      const newAnecdote = await anecdoteService.createNew(content)
      set(
         state => ({
          anecdotes: state.anecdotes.concat(newAnecdote),
          feedbackMessage: `You added '${newAnecdote.content}'`
        })
      )
      setTimeout(() => {
        set(() => ({feedbackMessage: ''}))
      }, 5000)
    },
    setFilter: value => set(() => ({filter: value})),
    initialize: async () => {
      const unSortedAnecdotes = await anecdoteService.getAll()
      const anecdotes = unSortedAnecdotes.toSorted((a,b) => b.votes - a.votes)
      set(() => ({anecdotes}))
    },
    deleteAnecdote: async (id) => {
      const anecdote = get().anecdotes.find(a => a.id === id)
      await anecdoteService.deleteAnecdote(id)
      set(
        state => ({
          anecdotes: state.anecdotes.filter( a => a.id !== id ),
          feedbackMessage: `You deleted '${anecdote.content}'`
        })
      )
      setTimeout(() => {
        set(() => ({feedbackMessage: ''}))
      }, 5000)
    }
    //setFeedbackMessage: (message) => {
    //  console.log(get().feedback)
    //  set(() => ({feedback: message}))
    //  console.log(get().feedback)
    //}
  },
}))

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes)
  const filter = useAnecdoteStore((state) => state.filter)
  if (filter !== '') return anecdotes.filter(a => a.content.toLowerCase().includes(filter))
  return anecdotes

}

export const useFeedbackMessage = () => useAnecdoteStore((state) => state.feedbackMessage)
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)
