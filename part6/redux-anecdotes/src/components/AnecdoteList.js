import { useDispatch, useSelector } from "react-redux"
import { vote } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(({ anecdotes, filter }) => 
    anecdotes.filter(anecdote => anecdote.content.includes(filter)))

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