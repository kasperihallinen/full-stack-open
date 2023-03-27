import { useDispatch, useSelector } from "react-redux"
import { vote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(({ anecdotes, filter }) => 
    anecdotes.filter(anecdote => anecdote.content.includes(filter)))

  const voteAnecdote = ({ id, content }) => {
    console.log('vote', id)
    dispatch(vote(id))
    dispatch(setNotification(`You voted '${content}'`, 5))
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
            <button onClick={() => voteAnecdote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList