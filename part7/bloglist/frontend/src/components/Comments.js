import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { commentBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
} from '@mui/material'

const Comments = ({ blog }) => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  const addComment = () => {
    if (!comment) {
      dispatch(setNotification('Comment cannot be empty', 5, 'error'))
      return
    }
    dispatch(commentBlog(blog.id, comment))
    dispatch(setNotification(`Comment added for blog ${blog.title}`))
    setComment('')
  }

  return (
    <div>
      <h3>Comments</h3>
      <TextField
        style={{ marginRight: 10, height: 10 }}
        size='small'
        id='comment'
        label='comment'
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      />
      <Button variant='contained' onClick={addComment}>
        add comment
      </Button>
      <Table>
        <TableBody>
          {blog.comments.map((comment, i) => {
            return (
              <TableRow key={i}>
                <TableCell>{comment}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

export default Comments
