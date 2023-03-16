import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {

  const blog = {
    id: '64108f1eb8f3f6ed583be8ae',
    title: 'title1',
    author: 'author1',
    url: 'url1',
    likes: 1,
    user: {
      id: '640b16af67af2386a150b022',
      name: 'name1',
      username: 'user1'
    }
  }

  const userObject = {
    name: 'name1',
    username: 'user1'
  }


  test('renders only title and author by default', () => {
    const likeBlog = () => null
    const deleteBlog = () => null

    render(<Blog blog={blog} user={userObject} likeBlog={likeBlog}
      deleteBlog={deleteBlog}/>)
    screen.getByText('title1 author1')
  })

  test('shows also url, likes and user name when view-button is clicked', async () => {
    const likeBlog = () => null
    const deleteBlog = () => null

    render(<Blog blog={blog} user={userObject} likeBlog={likeBlog}
      deleteBlog={deleteBlog}/>)

    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    screen.getByText('title1', { exact: false })
    screen.getByText('author1', { exact: false })
    screen.getByText('url1', { exact: false })
    screen.getByText('likes 1', { exact: false })
    screen.getByText('name1', { exact: false })
  })

  test('clicking the like-button twice calls the event handler twice', async () => {
    const likeBlog = jest.fn()
    const deleteBlog = () => null

    render(<Blog blog={blog} user={userObject} likeBlog={likeBlog}
      deleteBlog={deleteBlog}/>)

    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(likeBlog.mock.calls).toHaveLength(2)
  })
})