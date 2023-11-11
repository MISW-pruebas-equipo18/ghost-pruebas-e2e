describe('Login Test', () => {
  it('sets auth cookie when logging in via form submission', () => {
	  
    cy.visit('http://localhost:2368/ghost/')

    cy.get('input[name=identification]').type('eg.romeror1@uniandes.edu.co')
    cy.get('input[name=password]').type('GioR2023@@')
    cy.contains('Sign in →').click()
    cy.url().should('include', '/dashboard')
    cy.wait(10000)
  })
})