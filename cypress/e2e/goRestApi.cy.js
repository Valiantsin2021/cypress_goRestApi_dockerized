let baseUrl = Cypress.env('URL')
let authToken = Cypress.env('TOKEN')
describe('Open GoRest api url and test http requests GET, POST, PATCH and DELETE', () => {
  let userId
  let newUser = {
    name: 'Ondatra Zbyshek',
    email: 'compass@mail.com',
    gender: 'male',
    status: 'active'
  }
  let patchedUser = {
    name: 'Zbyl Onder',
    email: 'ontime@mail.com',
    gender: 'female',
    status: 'inactive'
  }
  it('should successfully perform GET request on GoRest api', () => {
    cy.api(`https://gorest.co.in/public/v2/${Cypress.env('url')}/`).as(
      'request'
    )
    cy.get('@request').then(response => {
      expect(response.status).to.be.equal(200)
      assert.isArray(response.body)
      expect(response.body.length).to.eq(10)
      for (let obj of response.body) {
        expect(obj).to.have.keys(['id', 'name', 'email', 'gender', 'status'])
      }
    })
  })
  it('should successfully perform POST request on GoRest api and create new user', () => {
    let users = 'users'
    cy.api({
      method: 'POST',
      url: `https://gorest.co.in/public/v2/${users}/`,
      auth: {
        bearer: authToken
      },
      body: newUser
    }).as('newUser')
    cy.get('@newUser').then(response => {
      expect(response.status).to.be.equal(201)
      expect(response.body).to.have.keys([
        'id',
        'name',
        'email',
        'gender',
        'status'
      ])
      cy.wrap(response.body).should('include', {
        name: 'Ondatra Zbyshek',
        email: 'compass@mail.com',
        gender: 'male',
        status: 'active'
      })
      userId = response.body.id
    })
  })
  it('should perform GET request and check the created user appeared in the database', () => {
    cy.api({
      method: 'GET',
      url: baseUrl,
      qs: { name: newUser.name }
    }).as('newUser')
    cy.get('@newUser').then(response => {
      expect(response.status).to.be.equal(200)
    })
  })
  it('should successfully preform PATCH request to modify the created user', () => {
    cy.api({
      method: 'PATCH',
      url: `${baseUrl}${userId}`,
      auth: {
        bearer: authToken
      },
      body: patchedUser
    }).as('patchedUser')
    cy.get('@patchedUser').then(response => {
      expect(response.status).to.be.equal(200)
      cy.wrap(response.body).should('include', {
        name: 'Zbyl Onder',
        email: 'ontime@mail.com',
        gender: 'female',
        status: 'inactive'
      })
    })
  })
  it('should perform GET request and check the updated user appeared in the database', () => {
    cy.api({
      method: 'GET',
      url: baseUrl,
      qs: { name: patchedUser.name }
    }).as('patchedUser')
    cy.get('@patchedUser').then(response => {
      expect(response.status).to.be.equal(200)
    })
  })
  it('should successfully preform DELETE request to delete the created user', () => {
    cy.api({
      method: 'DELETE',
      url: `${baseUrl}${userId}`,
      auth: {
        bearer: authToken
      },
      failOnStatusCode: false
    }).as('deletedUser')
    cy.get('@deletedUser').then(response => {
      expect(response.status).to.be.equal(204)
    })
  })
  it('should perform GET request and check the is not present in the database', () => {
    cy.api({
      method: 'GET',
      url: `${baseUrl}${userId}`,
      failOnStatusCode: false
    }).as('deletedUser')
    cy.get('@deletedUser').then(response => {
      expect(response.status).to.be.equal(404)
      cy.wrap(response.body).should('deep.include', {
        message: 'Resource not found'
      })
    })
  })
})
