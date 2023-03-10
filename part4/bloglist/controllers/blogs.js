const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { blogs: 0 })
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const { body, user } = request

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog.user.toString() !== request.user._id.toString()) {
    return response.status(401).send({ error: 'unauthorized access' })
  }

  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body
  const blog = { title, author, url, likes }

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id, blog, { new: true })

  if (updatedBlog) {
    response.json(updatedBlog)
  }
  else {
    response.status(404).end()
  }
})

module.exports = blogsRouter
