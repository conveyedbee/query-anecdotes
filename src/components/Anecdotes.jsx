import { useAnecdotes } from '../hooks/useAnecdotes'

const Anecdotes = () => {
    const { anecdotes, isPending, isError, voteAnecdote } = useAnecdotes()

    if (isPending) return <div>Loading data...</div>
    if (isError) return <div>anecdote service not available due to problems in the server</div>

    const onVote = (anecdote) => {
        voteAnecdote(anecdote)
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