import { useSelector, useDispatch } from 'react-redux'
import { useMatch, useNavigate } from 'react-router-dom'

import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Comments from './Comments'
import { Button } from '@mui/material'

const Blog = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const user = useSelector((state) => state.loggedUser)
  const blogs = useSelector((state) => state.blogs)

  const match = useMatch('/blogs/:id')
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null

  if (!blog) {
    return null
  }

  const canRemove = user && user.username === blog.user.username

  const like = () => {
    const blogToUpdate = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    dispatch(likeBlog(blogToUpdate))
    dispatch(
      setNotification(
        `A like for the blog '${blog.title}' by '${blog.author}'`,
        5
      )
    )
  }

  const remove = () => {
    const ok = window.confirm(
      `Sure you want to remove '${blog.title}' by ${blog.author}`
    )
    if (ok) {
      dispatch(removeBlog(blog.id))
      dispatch(
        setNotification(
          `The blog' ${blog.title}' by '${blog.author} removed`,
          5
        )
      )
      navigate('/')
    }
  }

  return (
    <div className='blog'>
      <h2>
        {blog.title} by {blog.author}
      </h2>
      <div style={{ fontSize: 18 }}>
        <div>
          {' '}
          <a href={blog.url}> {blog.url}</a>{' '}
        </div>
        <div>
          {blog.likes} likes{' '}
          <Button size='small' variant='contained' onClick={like}>
            like
          </Button>
        </div>
        <div>added by {blog.user && blog.user.name}</div>
        {canRemove && (
          <p>
            <Button size='small' variant='outlined' onClick={remove}>
              delete
            </Button>
          </p>
        )}
        <Comments blog={blog} />
      </div>
    </div>
  )
}

export default Blog
