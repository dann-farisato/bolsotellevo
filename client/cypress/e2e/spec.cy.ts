// describe('My First Test', () => {
//   it('Does not do much!', () => {
//     expect(true).to.equal(true)
//   })
// })
describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('http://localhost:3000') // change URL to match your dev URL
    cy.contains('Upcoming games')
    cy.contains('Login?').click()
    cy.url().should('include', '/login')
    cy.get('.action-email').type('email@email.com').should('have.value', 'email@email.com')
    cy.get('.action-user').type('123').should('have.value', '123')
    cy.get('.action-password').type('123456').should('have.value', '123456')
    cy.get('.my-btn').click()
    cy.contains('Failed to log in')

  })
})

describe('Sign Up from login page', () => {
  it('successfully loads', () => {
    cy.visit('http://localhost:3000/login') // change URL to match your dev URL
    cy.contains('Sign Up').click()
    cy.url().should('include', '/signup')
    cy.get('.action-email').type('email@email.com').should('have.value', 'email@email.com')
    cy.get('.action-user').type('123').should('have.value', '123')
    cy.get('.action-password').type('123456').should('have.value', '123456')
    cy.get('.my-btn').click()

  })
})
