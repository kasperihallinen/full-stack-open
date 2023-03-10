const bcrypt = require('bcrypt')
const supertest = require('supertest')
const helper = require('./test_helper')
const User = require('../models/user')
const app = require('../app')

const api = supertest(app)

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'tester',
      name: 'testi testaaja',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if username or password is not given', async () => {
    const usersAtStart = await helper.usersInDb()

    const users = [
      {
        name: 'testi testaaja',
        password: 'salainen',
      },
      {
        username: 'tester',
        name: 'testi testaaja',
      }
    ]

    for (let newUser of users) {
      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      if (!newUser.username) {
        expect(result.body.error).toContain('Path `username` is required')
      }
      else if (!newUser.password) {
        expect(result.body.error).toContain('password is required')
      }
    }

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if username or password is too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const users = [
      {
        username: 'u',
        name: 'testi testaaja',
        password: 'salainen',
      },
      {
        username: 'tester',
        name: 'testi testaaja',
        password: 'u'
      }
    ]

    for (let newUser of users) {
      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      if (newUser.username < 3) {
        expect(result.body.error).toContain('Path `username` (`u`) is shorter than the minimum allowed length')
      }
      else if (newUser.password < 3) {
        expect(result.body.error).toContain('password is too short')
      }
    }

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})