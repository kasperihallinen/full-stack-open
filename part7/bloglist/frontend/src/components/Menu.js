import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { logout } from '../reducers/loggedUserReducer'
import { AppBar, Button, Toolbar, Typography } from '@mui/material'

const Menu = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.loggedUser)

  const margin = {
    marginLeft: 5,
  }

  return (
    <AppBar position='static'>
      <Toolbar>
        <Button
          style={margin}
          variant='outlined'
          color='inherit'
          component={Link}
          to='/'>
          blogs
        </Button>
        <Button
          style={margin}
          variant='outlined'
          color='inherit'
          component={Link}
          to='/users'>
          users
        </Button>
        <Typography sx={{ flexGrow: 1 }}></Typography>
        {user.name} logged in{' '}
        <Button
          style={margin}
          variant='outlined'
          color='inherit'
          onClick={() => dispatch(logout())}>
          logout
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Menu
