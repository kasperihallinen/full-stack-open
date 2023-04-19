import { useMutation } from '@apollo/client'
import { useState } from 'react'
import Select from 'react-select'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const Birthyear = ({ authors, notify }) => {
  const [choice, setChoice] = useState({})
  const [born, setBorn] = useState('')

  const options = authors.map((a) => {
    return { value: a.name, label: a.name }
  })

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ALL_AUTHORS],
    onError: (error) => {
      notify(error.message)
    },
  })

  const submit = (event) => {
    event.preventDefault()

    console.log('edit author...')
    editAuthor({ variables: { name: choice.value, born: Number(born) } })

    setChoice({})
    setBorn('')
  }

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          <Select
            value={choice}
            options={options}
            onChange={(target) => setChoice(target)}
          />
        </div>
        <div>
          born
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Birthyear
