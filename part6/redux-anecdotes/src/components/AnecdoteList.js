import { useDispatch, useSelector } from "react-redux"
import { vote } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const voteAnecdote = (id) => {
    console.log('vote', id)
    dispatch(vote(id))
  }

  const byVotes = anecdotes.sort((a, b) => b.votes - a.votes)

  return (
    <div>
      {byVotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteAnecdote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList