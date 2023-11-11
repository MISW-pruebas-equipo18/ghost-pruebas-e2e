// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
export function registerCommands(){
  Cypress.Commands.add('login', (user,passw) =>
  { 
      cy.visit('http://localhost:2368/ghost/')
      cy.get('input[name=identification]').type(user)
      cy.get('input[name=password]').type(passw)
      cy.contains('Sign in →').click()
      cy.url().should('include', '/dashboard')
      cy.wait(1000)
  });
}