import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, updateAnecdote } from '../requests'
import { useNotifications } from './useNotifications'

export const useAnecdotes = () => {
    const queryClient = useQueryClient()
    const { notify } = useNotifications()

    const { data: anecdotes = [], isPending, isError } = useQuery({
        queryKey: ['anecdotes'],
        queryFn: getAnecdotes,
        refetchOnWindowFocus: false,
    })

    const newAnecdoteMutation = useMutation({
        mutationFn: createAnecdote,
        onSuccess: (newAnecdote) => {
            const anecdotes = queryClient.getQueryData(['anecdotes'])
            queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
        },
        onError: (error) => {
            notify('Error creating anecdote' + error.message)
        }
    })

    const updateAnecdoteMutation = useMutation({
        mutationFn: updateAnecdote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
        },
        onError: (error) => {
            notify('Error voting anecdote' + error.message)
        }
    })

    const addAnecdote = (content) => {
        newAnecdoteMutation.mutate(
            { content, votes: 0 },
            { onSuccess: () => notify(`anecdote '${content}' created`)}
        )
    }

    const voteAnecdote = (anecdote) => {
        updateAnecdoteMutation.mutate(
            { ...anecdote, votes: anecdote.votes + 1 },
            { onSuccess: () => notify(`you voted '${anecdote.content}'`)}
        )
    }

    return {
        anecdotes,
        isPending,
        isError,
        addAnecdote,
        voteAnecdote
    }
}