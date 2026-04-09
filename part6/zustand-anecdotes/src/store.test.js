import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'

vi.mock('./services/anecdotes', () => ({
    default: {
        getAll: vi.fn(),
        createNew: vi.fn(),
        update: vi.fn(),
    }
}))

import anecdoteService from './services/anecdotes'
import useAnecdoteStore, { useAnecdotes, useFeedbackMessage, useAnecdoteActions} from './store'

beforeEach(() => {
    useAnecdoteStore.setState({ anecdotes: [], filter: '', feedbackMessage: '' })
    vi.clearAllMocks()
})

describe('useAnedoteActions', () => {
    //Tee testi, joka varmistaa, että tila alustetaan niillä anekdooteilla, jotka backend palauttaa.
    
    it('initialize loads anecdotes from backend', async () => {
        const mockAnecdotes = [{ id: 1, content: 'eka', votes: 0 }]
        anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

        const { result } = renderHook(() => useAnecdoteActions())

        await act(async () => {
            await result.current.initialize()
        })

        const { result: anecdoteResult  } = renderHook(() => useAnecdotes())
        expect(anecdoteResult.current).toEqual(mockAnecdotes)
    })


    //Tee testi, joka varmistaa että anekdootit näyttävä komponentti saa anekdootit storelta äänten mukaan järjestettynä
    
    it('useAnecdotes return anecdotes in order by votes', async () => {
        const mockAnecdotes = [
            { id: 1, content: 'eka', votes: 0 },
            { id: 2, content: 'toka', votes: 3 },
            { id: 3, content: 'kolmas', votes: 1 }
        ]
        anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

        const { result } = renderHook(() => useAnecdoteActions())

        await act(async () => {
            await result.current.initialize()
        })

        const { result: anecdoteResult  } = renderHook(() => useAnecdotes())
        expect(anecdoteResult.current[0]).toEqual(mockAnecdotes[1])

    })


    //Tee testi, joka varmistaa, että oikea React-komponentti saa oikein filtteröidyn listan anekdooteista.
    it('useAnecdotes return filterred list of anecdotes', async () => {

        const mockAnecdotes = [
            { id: 1, content: 'eka', votes: 0 },
            { id: 2, content: 'toka', votes: 3 },
            { id: 3, content: 'kolmas', votes: 1 }
        ]
        anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

        const { result } = renderHook(() => useAnecdoteActions())

        await act(async () => {
            await result.current.initialize()
            result.current.setFilter('ka')
        })

        const { result: anecdoteResult  } = renderHook(() => useAnecdotes())
        expect(anecdoteResult.current).toHaveLength(2)
        expect(anecdoteResult.current[0]).toEqual(mockAnecdotes[1])
        expect(anecdoteResult.current[1]).toEqual(mockAnecdotes[0])
    })

    //Tee testi, joka varmistaa, että äänestäminen korottaa anekdootin äänien määrää

    it('', async () => {
        const mockAnecdotes = [
            { id: 1, content: 'eka', votes: 0 },
            { id: 2, content: 'toka', votes: 3 },
            { id: 3, content: 'kolmas', votes: 1 }
        ]

        const updatedAnecdote = { id: 1, content: 'eka', votes: 1 }
        anecdoteService.getAll.mockResolvedValue(mockAnecdotes)
        anecdoteService.update.mockResolvedValue(updatedAnecdote)

        const { result } = renderHook(() => useAnecdoteActions())

        await act(async () => {
            await result.current.initialize()
            result.current.addVote(1)
            result.current.setFilter('eka')
        })

        const { result: anecdoteResult  } = renderHook(() => useAnecdotes())
        expect(anecdoteResult.current).toEqual([updatedAnecdote])
    })
})