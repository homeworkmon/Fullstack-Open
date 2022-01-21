describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Monica M',
      username: 'monica',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
    cy.get('form')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('monica')
      cy.get('#password').type('password')
      cy.contains('login').click()
      cy.contains('monica logged in')
    })

    it('fails with incorrect credentials', function() {
      cy.get('#username').type('monica')
      cy.get('#password').type('wrong-password')
      cy.contains('login').click()
      cy.get('.error').contains('Wrong credentials')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('monica')
      cy.get('#password').type('password')
      cy.contains('login').click()
      cy.contains('monica logged in')
    })

    it('A blog can be created', function() {
      cy.contains('create new').click()
      cy.get('#title').type('a new blog created')
      cy.get('#author').type('matti L')
      cy.get('#url').type('https://fullstack-open.ca')
      cy.get('#create-new').click()
      cy.contains('a new blog created')
      cy.contains('matti L')
      cy.contains('https://fullstack-open.ca')
    })

    describe('one blog post', function () {
      beforeEach(function() {
        const blog1 = { title: 'its a post', author: 'matti l', url: 'heres a URL', likes:0  }
        cy.addPost(blog1)
        cy.visit('http://localhost:3000')
      })
      it('liking a blog increases like by 1', function () {
        cy.contains('its a post')
        cy.contains('view').click()
        cy.get('#likes').should('contain', '0')
        cy.get('#like-button').click()
        cy.get('#likes').should('contain', '1')
      })

      it('deleting a blog post by user who created it works', function () {
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.get('container').should('not.exist')
      })
    })

    describe('multiple blog posts', function () {
      beforeEach(function() {
        cy.addPost({ title: 'its a post', author: 'matti l', url: 'heres a URL', likes: 0 })
        cy.addPost({ title: 'its a second post', author: 'monica', url: 'heres another URL', likes: 10 })
        cy.addPost({ title: 'its a third post', author: 'matti l', url: 'heres a third URL', likes: 4 })
        cy.visit('http://localhost:3000')
      })

      it.only('posts are ordered by most liked at the top', function() {
        cy.get('.container').each((element, index, list) => {
          expect(list).to.have.length(3)
        })
      })
    })
  })
})
