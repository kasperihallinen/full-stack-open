import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_GENRES } from '../queries'
import { useState } from 'react'

import BookTable from './BookTable'

const Books = (props) => {
  const [genre, setGenre] = useState('all genres')
  const genresResult = useQuery(ALL_GENRES)
  const booksResult = useQuery(ALL_BOOKS, {
    variables: { genre: genre },
  })

  if (!props.show || booksResult.loading || genresResult.loading) {
    return null
  }

  const books = booksResult.data.allBooks
  const genres = genresResult.data.allGenres

  return (
    <div>
      <h2>Books</h2>

      <div>
        books in genre <strong>{genre}</strong>
      </div>

      <BookTable books={books} />

      {genres.map((g) => (
        <button key={g} onClick={() => setGenre(g)}>
          {g}
        </button>
      ))}
      <button onClick={() => setGenre('all genres')}>all genres</button>
    </div>
  )
}

export default Books
