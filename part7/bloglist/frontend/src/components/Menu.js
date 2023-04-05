import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { logout } from '../reducers/loggedUserReducer'

const Menu = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.loggedUser)

  const padding = {
    paddingRight: 5,
  }

  return (
    <div>
      <Link style={padding} to='/'>
        blogs
      </Link>
      <Link style={padding} to='/users'>
        users
      </Link>
      {user.name} logged in
      <button onClick={() => dispatch(logout())}>logout</button>
    </div>
  )
}

export default Menu
