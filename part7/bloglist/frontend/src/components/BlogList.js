import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)

  const style = {
    marginBottom: 2,
    padding: 5,
    borderStyle: 'solid',
  }

  const byLikes = [...blogs].sort((b1, b2) => b2.likes - b1.likes)

  return (
    <div>
      {byLikes.map((blog) => (
        <div key={blog.id} style={style}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      ))}
    </div>
  )
}

export default BlogList
