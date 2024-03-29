import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'

import Birthyear from './Birthyear'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)

  if (!props.show || result.loading) {
    return null
  }

  const authors = result.data.allAuthors

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {props.allowEdit && <Birthyear authors={authors} notify={props.notify} />}
    </div>
  )
}

export default Authors
