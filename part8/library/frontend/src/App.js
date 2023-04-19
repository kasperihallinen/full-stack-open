import { useEffect, useState } from 'react'
import { useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const userToken = localStorage.getItem('library-user-token')
    if (userToken) {
      setToken(userToken)
    }
  }, [])

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => setErrorMessage(null), 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && (
          <button onClick={() => setPage('recommend')}>recommend</button>
        )}
        {token && <button onClick={logout}>logout</button>}
        {!token && <button onClick={() => setPage('login')}>login</button>}
      </div>

      <Notification message={errorMessage} />

      <Authors
        show={page === 'authors'}
        notify={notify}
        allowEdit={token !== null}
      />

      <Books show={page === 'books'} />

      {token && <NewBook show={page === 'add'} notify={notify} />}

      {token && <Recommendations show={page === 'recommend'} />}

      {!token && (
        <LoginForm
          show={page === 'login'}
          notify={notify}
          setToken={setToken}
          setPage={setPage}
        />
      )}
    </div>
  )
}

export default App
