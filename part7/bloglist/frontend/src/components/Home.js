import { useRef } from 'react'

import Togglable from './Togglable'
import BlogForm from './BlogForm'
import BlogList from './BlogList'

const Home = () => {
  const blogFormRef = useRef()

  const toggleVisibility = () => {
    blogFormRef.current.toggleVisibility()
  }

  return (
    <div>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm toggleVisibility={toggleVisibility} />
      </Togglable>
      <BlogList />
    </div>
  )
}

export default Home
