import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAll, createAnecdote, updateAnecdote } from '../requests'

import useNotification from './useNotification'

export const useAnecdotes = () => {
    const { setMessage } = useNotification()
    const queryClient = useQueryClient()

    const result = useQuery({
        queryKey: ['anecdotes'],
        queryFn: getAll,
        retry: 1,
        refetchOnWindowFocus: false
    })

    const newAnecdoteMutation = useMutation({
        mutationFn: createAnecdote,
        onSuccess: (newAnecdote) => {
            const anecdotes = queryClient.getQueryData(['anecdotes'])
            queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
            setMessage(`added ${newAnecdote.content}`)
            setTimeout(()=>{
                setMessage('')
            },5000)
        },
        onError: (error) => {
            //const message = error.message === 'Failed to fetch' ? 'anecdote service not available due to problems in server' : error.message
            setMessage(error.message)
            setTimeout(()=>{
                setMessage('')
            },5000)
        }
    })

    const updateAnecdoteMutation = useMutation({
        mutationFn: updateAnecdote,
        onSuccess: (updatedAnecdote) => {
            const anecdotes = queryClient.getQueryData(['anecdotes'])
            queryClient.setQueryData(['anecdotes'], anecdotes.map( a => a.id !== updatedAnecdote.id ? a : updatedAnecdote ))
            setMessage(`anecdote ${updatedAnecdote.content} voted`)
            setTimeout(()=>{
                setMessage('')
            },5000)
        }
    })

    return {
        anecdotes: result.data,
        isPending: result.isPending,
        isError: result.isError,
        error: result.error,
        addAnecdote: (content) => newAnecdoteMutation.mutate({content, votes: 0}),
        vote: (anecdote) => updateAnecdoteMutation.mutate({
            ...anecdote, votes: anecdote.votes +1
        })
    }
}