const listHelper = require('../utils/list_helper')
const allBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

const oneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    const blogs = []
    expect(listHelper.totalLikes(blogs)).toBe(0)
  })

  test('when list has only one value equals the likes of that', () => {
    const blogs = oneBlog

    expect(listHelper.totalLikes(blogs)).toBe(blogs[0].likes)
  })

  test('of a bigger list is calculated right', () => {
    const blogs = allBlogs

    expect(listHelper.totalLikes(blogs)).toBe(36)
  })
})

describe('favourite blog', () => {
  test('of empty list is undefined', () => {
    const blogs = []
    expect(listHelper.favouriteBlog(blogs)).toEqual(undefined)
  })

  test('when list has only one blog equals the values of that blog', () => {
    const blogs = oneBlog
    const expected = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5
    }

    expect(listHelper.favouriteBlog(blogs)).toEqual(expected)
  })

  test('of a bigger list is calculated right', () => {
    const blogs = allBlogs

    const expected = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    }
    expect(listHelper.favouriteBlog(blogs)).toEqual(expected)
  })
})

describe('most blogs', () => {
  test('of empty list is undefined', () => {
    const blogs = []
    expect(listHelper.mostBlogs(blogs)).toEqual(undefined)
  })

  test('when list has only one blog', () => {
    const blogs = oneBlog

    const expected = {
      author: 'Edsger W. Dijkstra',
      blogs: 1
    }
    expect(listHelper.mostBlogs(blogs)).toEqual(expected)
  })

  test('of a bigger list is calculated right', () => {
    const blogs = allBlogs

    const expected = {
      author: 'Robert C. Martin',
      blogs: 3
    }
    expect(listHelper.mostBlogs(blogs)).toEqual(expected)
  })
})

describe('most likes', () => {
  test('of empty list is undefined', () => {
    const blogs = []
    expect(listHelper.mostLikes(blogs)).toEqual(undefined)
  })

  test('when list has only one blog', () => {
    const blogs = oneBlog

    const expected = {
      author: 'Edsger W. Dijkstra',
      likes: 5
    }
    expect(listHelper.mostLikes(blogs)).toEqual(expected)
  })

  test('of a bigger list is calculated right', () => {
    const blogs = allBlogs

    const expected = {
      author: 'Edsger W. Dijkstra',
      likes: 17
    }
    expect(listHelper.mostLikes(blogs)).toEqual(expected)
  })
})