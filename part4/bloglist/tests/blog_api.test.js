const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')
const app = require('../app')

const api = supertest(app)

describe('when there is initially some blogs and one user saved', () => {
  let token

  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('sekret', 10)
    let user = new User({ username: 'root', passwordHash })
    await user.save()

    await Blog.deleteMany({})
    const blogs = helper.initialBlogs.map(blog => { return { ...blog, user: user._id }})
    await Blog.insertMany(blogs)

    user = {
      username: 'root',
      password: 'sekret'
    }
    const response = await api
      .post('/api/login')
      .send(user)

    token = response.body.token
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

  describe('adding a blog', () => {

    test('succeeds when the blog is valid', async () => {
      const newBlog = {
        title: 'test title',
        author: 'test author',
        url: 'test url',
        likes: 0
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

      const titles = blogsAtEnd.map(blog => blog.title)
      expect(titles).toContain('test title')
    })

    test('sets likes to 0 if likes are missing', async () => {
      const newBlog = {
        title: 'test title',
        author: 'test author',
        url: 'test url'
      }

      const result = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

      expect(result.body.likes).toBe(0)
    })

    test('fails if title or url is missing', async () => {
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
        .set('Authorization', `Bearer ${token}`)
        .send(noTitle)
        .expect(400)

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(noUrl)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })

    test('fails if token is missing', async () => {
      const newBlog = {
        title: 'test title',
        author: 'test author',
        url: 'test url',
        likes: 0
      }

      const result = await api
        .post('/api/blogs')
        .set('Authorization', 'Bearer')
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

      expect(result.body.error).toContain('token missing or invalid')
    })
  })

  describe('deleting a blog', () => {

    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

      const titles = blogsAtEnd.map(blog => blog.title)
      expect(titles).not.toContain(blogToDelete.title)
    })

    test('fails with status code 400 if id is invalid', async () => {
      const invalidId = '123qwe'

      await api
        .delete(`/api/blogs/${invalidId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(400)
    })
  })

  describe('updating likes', () => {

    test('works when id is valid', async () => {
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

    test('fails with status code 400 if id is invalid', async () => {
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

    test('fails with status code 404 if id is not found', async () => {
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
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })
})
