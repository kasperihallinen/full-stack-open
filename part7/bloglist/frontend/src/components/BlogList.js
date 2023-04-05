import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)
  const byLikes = [...blogs].sort((b1, b2) => b2.likes - b1.likes)

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <strong>Title</strong>
          </TableCell>
          <TableCell>
            <strong>Author</strong>
          </TableCell>
          <TableCell>
            <strong>Added by</strong>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {byLikes.map((blog) => (
          <TableRow key={blog.id}>
            <TableCell>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </TableCell>
            <TableCell>{blog.author}</TableCell>
            <TableCell>{blog.user.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default BlogList
