import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { login } from '../reducers/loggedUserReducer'
import { Button, TextField } from '@mui/material'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(login(username, password))
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        <TextField
          style={{ marginBottom: 10 }}
          size='small'
          id='username'
          label='username'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <TextField
          style={{ marginBottom: 10 }}
          size='small'
          id='password'
          type='password'
          label='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <Button id='login-button' type='submit' variant='contained'>
        login
      </Button>
    </form>
  )
}

export default LoginForm
