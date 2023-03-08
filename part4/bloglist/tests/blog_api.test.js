const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('id is defined', async () => {
  const response = await api.get('/api/blogs')

  response.body.forEach(blog => expect(blog.id).toBeDefined())
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'test title',
    author: 'test author',
    url: 'test url',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(blog => blog.title)
  expect(titles).toContain('test title')
})

test('likes are set to 0 if they are not given', async () => {
  const newBlog = {
    title: 'test title',
    author: 'test author',
    url: 'test url'
  }

  const result = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  expect(result.body.likes).toBe(0)
})

test('blog without title or url is not added', async () => {
  const noTitle = {
    author: 'test author',
    url: 'test url'
  }

  const noUrl = {
    title: 'test title',
    author: 'test author',
  }

  await api
    .post('/api/blogs')
    .send(noTitle)
    .expect(400)

  await api
    .post('/api/blogs')
    .send(noUrl)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('deletion succeeds with status code 204 if id is valid', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

  const titles = blogsAtEnd.map(blog => blog.title)
  expect(titles).not.toContain(blogToDelete.title)
})

test('deletion fails with status code 400 if id is invalid', async () => {
  const invalidId = '123qwe'

  await api
    .delete(`/api/blogs/${invalidId}`)
    .expect(400)
})

test('updating likes works when id is valid', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]
  const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 }

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlog)
    .expect(200)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

  const blog = blogsAtEnd.filter(blog => blog.title === blogToUpdate.title)[0]
  expect(blog.likes).toBe(blogToUpdate.likes + 1)
})

test('update fails with status code 400 if id is invalid', async () => {
  const invalidId = '123qwe'
  const updatedBlog = {
    title: 'test title',
    author: 'test author',
    url: 'test url',
    likes: 0
  }

  await api
    .put(`/api/blogs/${invalidId}`)
    .send(updatedBlog)
    .expect(400)
})

test('update fails with status code 404 if id is not found', async () => {
  const id = await helper.nonExistingId()
  const updatedBlog = {
    title: 'test title',
    author: 'test author',
    url: 'test url',
    likes: 0
  }

  await api
    .put(`/api/blogs/${id}`)
    .send(updatedBlog)
    .expect(404)
})

afterAll(async () => {
  await mongoose.connection.close()
})