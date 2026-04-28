import { useAnecdotes } from '../hooks/useAnecdotes'
import { useNotifications } from '../hooks/useNotifications'

const Anecdotes = () => {
    const { anecdotes, isPending, isError, voteAnecdote } = useAnecdotes()
    const { notify } = useNotifications()

    if (isPending) return <div>Loading data...</div>
    if (isError) return <div>anecdote service not available due to problems in the server</div>

    const onVote = (anecdote) => {
        voteAnecdote(anecdote)
        notify(`you voted '${anecdote.content}'`)
    }
    
    return (
        <div>
            {anecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => onVote(anecdote)}>vote</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Anecdotes