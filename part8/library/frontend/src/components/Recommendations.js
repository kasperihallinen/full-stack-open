import BookTable from './BookTable'

import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'
import { useEffect, useState } from 'react'

const Recommendations = ({ show }) => {
  const [genre, setGenre] = useState('all genres')

  const meResult = useQuery(ME, {
    fetchPolicy: 'no-cache',
  })
  const booksResult = useQuery(ALL_BOOKS, {
    variables: { genre: genre },
  })

  useEffect(() => {
    if (meResult.data && meResult.data.me) {
      setGenre(meResult.data.me.favoriteGenre)
    }
  }, [meResult.data])

  if (!show || booksResult.loading || meResult.loading) {
    return null
  }

  return (
    <div>
      <h2>Recommendations</h2>

      <div>
        books in your favorite genre <strong>{genre}</strong>
      </div>

      <BookTable books={booksResult.data.allBooks} />
    </div>
  )
}

export default Recommendations
