import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
    createBlog(newBlog)

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input type='text' value={newTitle} name='New title'
            onChange={({ target }) => setNewTitle(target.value)}>
          </input>
        </div>
        <div>
          author:
          <input type='text' value={newAuthor} name='New author'
            onChange={({ target }) => setNewAuthor(target.value)}>
          </input>
        </div>
        <div>
          url:
          <input type='text' value={newUrl} name='New url'
            onChange={({ target }) => setNewUrl(target.value)}>
          </input>
        </div>
        <div>
          <button type='submit'>create</button>
        </div>
      </form>
    </div>
  )
}

BlogForm.propTypes ={
  createBlog: PropTypes.func.isRequired
}

export default BlogForm