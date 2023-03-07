const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, item) => {
    return sum += item.likes
  }, 0)
}

const favouriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  }

  const mostLikes = blogs.reduce((favourite, next) => {
    if (next.likes > favourite.likes) {
      return next
    }
    else {
      return favourite
    }
  })

  return {
    title: mostLikes.title,
    author: mostLikes.author,
    likes: mostLikes.likes
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  }

  const blogsPerAuthor = blogs.reduce((accumulator, next) => {
    if (!accumulator[next.author]) {
      accumulator[next.author] = 0
    }
    accumulator[next.author] += 1
    return accumulator
  }, {})

  const initialValue = {
    author: '',
    blogs: 0
  }
  const mostBlogsAuthor = _.reduce(blogsPerAuthor, (result, value, key) => {
    if (result.blogs < value) {
      result.author = key
      result.blogs = value
    }
    return result
  }, initialValue)

  return mostBlogsAuthor
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  }

  const likesPerAuthor = blogs.reduce((accumulator, next) => {
    if (!accumulator[next.author]) {
      accumulator[next.author] = 0
    }
    accumulator[next.author] += next.likes
    return accumulator
  }, {})

  const initialValue = {
    author: '',
    likes: 0
  }
  const mostLikesAuthor = _.reduce(likesPerAuthor, (result, value, key) => {
    if (result.likes < value) {
      result.author = key
      result.likes = value
    }
    return result
  }, initialValue)

  return mostLikesAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}