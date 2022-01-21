Cypress.Commands.add('addPost', ({ title, author, url, likes }) => {
  cy.request({
    url: 'http://localhost:3003/api/blogs',
    method: 'POST',
    body : { title, author, url, likes },
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogUser')).token}`
    }
  })
})