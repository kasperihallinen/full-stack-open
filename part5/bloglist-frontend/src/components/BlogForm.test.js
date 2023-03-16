import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {

  test('calls the callback function with right parameters when a blog is created', async () => {
    const user = userEvent.setup()
    const createBlog = jest.fn()

    const { container } = render(<BlogForm createBlog={createBlog} />)

    const createButton = screen.getByText('create')
    const titleInput = container.querySelector('#title-input')
    const authorInput = container.querySelector('#author-input')
    const urlInput = container.querySelector('#url-input')

    await user.type(titleInput, 'title1')
    await user.type(authorInput, 'author1')
    await user.type(urlInput, 'url1')
    await user.click(createButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    const createBlogParams = createBlog.mock.calls[0][0]
    expect(createBlogParams.title).toBe('title1')
    expect(createBlogParams.author).toBe('author1')
    expect(createBlogParams.url).toBe('url1')
  })
})