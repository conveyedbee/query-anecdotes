import { useAnecdotes } from '../hooks/useAnecdotes'
import { useNotifications } from '../hooks/useNotifications'

const AnecdoteForm = () => {
  const { addAnecdote: addAnecdoteToServer } = useAnecdotes()
  const { notify } = useNotifications()

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value

    if (content.length < 5) {
      alert('too short anecdote, must have length 5 or more')
      return
    }

    event.target.reset()
    addAnecdoteToServer(content)
    notify(`anecdote '${content}' created`)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm