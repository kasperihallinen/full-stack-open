import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [info, setInfo] = useState(null)

  useEffect(() => {
    getAndSetAllBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const getAndSetAllBlogs = () => {
    blogService.getAll().then(blogs => setBlogs( blogs ))
  }

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    }
    catch (exception) {
      showNotification('Wrong username or password', 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const createBlog = async newBlog => {
    const createdBlog = await blogService.create(newBlog)
    getAndSetAllBlogs()
    showNotification(`A new blog ${createdBlog.title} by ${createdBlog.author} was added`)
    blogFormRef.current.toggleVisibility()
  }

  const likeBlog = async (id, changedBlog) => {
    const updatedBlog = await blogService.update(id, changedBlog)
    setBlogs(blogs.map(blog => blog.id !== id
      ? blog
      : { ...blog, likes: updatedBlog.likes }))
  }

  const deleteBlog = async (id) => {
    await blogService.deleteOne(id)
    setBlogs(blogs.filter(blog => blog.id !== id))
  }

  const showNotification = (message, type) => {
    setInfo({ message, type })
    setTimeout(() => { setInfo(null) }, 5000)
  }

  const blogFormRef = useRef()

  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification info={info}></Notification>
        <LoginForm handleLogin={handleLogin}></LoginForm>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification info={info}></Notification>
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel={'create new blog'} ref={blogFormRef}>
        <BlogForm createBlog={createBlog}></BlogForm>
      </Togglable>

      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} user={user}
          likeBlog={likeBlog} deleteBlog={deleteBlog}/>
      )}
    </div>
  )
}

export default App