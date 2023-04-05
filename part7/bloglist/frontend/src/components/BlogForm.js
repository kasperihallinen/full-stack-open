import { useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Button, TextField } from '@mui/material'

const BlogForm = ({ toggleVisibility }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!(title && author && url)) {
      dispatch(
        setNotification(
          'Creation failed: all fields must be filled',
          5,
          'error'
        )
      )
      return
    }
    dispatch(createBlog({ title, author, url }))
    dispatch(setNotification(`A new blog '${title}' by '${author}' added`, 5))
    toggleVisibility()
  }

  return (
    <div>
      <h3>Create a new blog</h3>

      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            style={{ marginBottom: 10 }}
            size='small'
            id='title'
            label='title'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <TextField
            style={{ marginBottom: 10 }}
            size='small'
            id='author'
            label='author'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <TextField
            style={{ marginBottom: 10 }}
            size='small'
            id='url'
            label='url'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <Button
          style={{ marginBottom: 5 }}
          size='small'
          type='submit'
          variant='contained'>
          create
        </Button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  toggleVisibility: PropTypes.func.isRequired,
}

export default BlogForm
