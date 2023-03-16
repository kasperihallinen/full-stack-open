import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, likeBlog, deleteBlog }) => {
  const [viewAll, setViewAll] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleViewAll = () => {
    setViewAll(!viewAll)
  }

  const handleLike = () => {
    const changedBlog = {
      ...blog,
      likes: blog.likes + 1
    }

    likeBlog(blog.id, changedBlog)
  }

  const handleRemove = () => {
    const confirmed = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (confirmed) {
      deleteBlog(blog.id)
    }
  }

  const additionalInfo = () => {
    const removeButtonStyle = {
      display: blog.user.username === user.username ? '' : 'none',
      background: 'lightblue',
    }

    return (
      <div>
        {blog.url} <br/>
        likes {blog.likes} <button onClick={handleLike}>like</button> <br/>
        {blog.user.name}
        <div>
          <button style={removeButtonStyle} onClick={handleRemove}>remove</button>
        </div>
      </div>
    )
  }

  return (
    <div style={blogStyle} className='blog'>
      {blog.title} {blog.author}
      <button onClick={toggleViewAll}>{viewAll ? 'hide' : 'view'}</button>
      {viewAll && additionalInfo()}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog