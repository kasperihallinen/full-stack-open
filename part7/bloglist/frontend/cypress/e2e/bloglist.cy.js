describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.addUser({
      username: 'testuser1',
      name: 'testname1',
      password: 'testpass1'
    })
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('Username')
    cy.contains('Password')
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('testuser1')
      cy.get('#password').type('testpass1')
      cy.get('#login-button').click()
      cy.contains('testname1 logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('testuser1')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('Wrong username or password')
      cy.contains('Log in to application')
      cy.get('html').should('not.contain', 'testname1 logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'testuser1', password: 'testpass1' })
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title-input').type('Test title')
      cy.get('#author-input').type('Test author')
      cy.get('#url-input').type('Test url')
      cy.get('#create-blog-button').click()

      cy.contains('A new blog Test title by Test author was added')
      cy.contains('Test title Test author')
        .contains('view').click()
      cy.contains('Test url')
        .contains('likes 0')
        .contains('testname1')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Test title',
          author: 'Test author',
          url: 'Test url',
          likes: 0
        })
      })

      it('blog can be liked', function () {
        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains('likes 1')
      })

      it('blog can be removed by the user that added the blog', function () {
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.get('html').should('not.contain', 'Test title Test author')
      })

      it('remove button is only seen by user who added the blog', function () {
        const user = {
          username: 'testuser2', name: 'testname2', password: 'testpass2'
        }
        cy.addUser(user)
        cy.login(user)

        cy.contains('view').click()
        cy.contains('remove').should('have.css', 'display', 'none')
      })
    })

    describe('and multiple blogs exist', function () {
      const indexes = [2, 0, 1, 3]

      beforeEach(function () {
        for (let index of indexes) {
          cy.createBlog({
            title: `Title ${index}`,
            author: `Author ${index}`,
            url: `url ${index}`,
            likes: indexes.length - index - 1
          })
        }

        for (let index of indexes) {
          cy.contains(`Title ${index} Author ${index}`)
            .contains('view').click()
        }
      })

      it('blogs are sorted based on the amount of likes', function () {
        for (let index of indexes) {
          cy.get('.blog').eq(index).should('contain', `Title ${index}`)
        }
      })
    })
  })
})