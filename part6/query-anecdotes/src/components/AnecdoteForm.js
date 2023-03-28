import { useMutation, useQueryClient } from "react-query"

import { useNotificationDispatch } from "../AnecdoteContext"
import { createAnecdote } from "../request"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => { queryClient.invalidateQueries('anecdotes') },
    onError: (error) => {
      notificationDispatch({
        type: 'SET', 
        payload: error.response.data.error
      })
      setTimeout(() => notificationDispatch({ type: 'CLEAR' }), 5000)
    }
  })
  const notificationDispatch = useNotificationDispatch()

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecdoteMutation.mutate({ content, votes: 0 })
    notificationDispatch({
      type: 'SET', 
      payload: `Anecdote '${content}' added`
    })
    setTimeout(() => notificationDispatch({ type: 'CLEAR' }), 5000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
