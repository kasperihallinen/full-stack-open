import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { Container } from '@mui/material'

import Home from './components/Home'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import UserList from './components/UserList'
import User from './components/User'
import Blog from './components/Blog'
import Menu from './components/Menu'

import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/loggedUserReducer'
import { initializeUsers } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.loggedUser)

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [])

  if (!user) {
    return (
      <Container>
        <h2>log in to application</h2>
        <Notification />
        <LoginForm />
      </Container>
    )
  }

  return (
    <Container>
      <Menu />
      <h1>Blog app</h1>
      <Notification />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/users' element={<UserList />}></Route>
        <Route path='/users/:id' element={<User />}></Route>
        <Route path='/blogs/:id' element={<Blog />}></Route>
      </Routes>
    </Container>
  )
}

export default App
