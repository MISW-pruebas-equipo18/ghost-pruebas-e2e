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
      cy.visit('http://localhost:2368/ghost/#/signin')
      cy.wait(1000)
      cy.get('input[name=identification]').clear()
      cy.get('input[name=password]').clear()
      cy.get('input[name=identification]').type(user)
      cy.get('input[name=password]').type(passw)
      cy.get('button.gh-btn-login').click()
      cy.url().should('include', '/dashboard')
      cy.wait(100)
  });

  Cypress.Commands.add('createEditPost', (user,passw,postTitle) =>
  { 
    cy.login(user,passw)
    cy.contains('Posts').click()
    cy.url().should('include', '/posts')
    
    //publicación de post con datos vacios
    cy.contains('New post').click()
    cy.url().should('include', '/editor/post')
    cy.get('textarea.gh-editor-title').type("Prueba")
    cy.get('textarea.gh-editor-title').clear()
    cy.get('div.kg-prose').type("Prueba")
    cy.get('div.kg-prose').clear()
    cy.wait(2000)
    cy.contains('Publish').click()
    cy.wait(1000)
    cy.contains('Publish and email').click()
    cy.wait(1000)
    cy.contains('Publish only').click()
    cy.contains('Continue, final review →').click()
    cy.wait(1000)
    cy.contains('Publish post, right now').click()
    cy.wait(1000)
    cy.get('span.green').should('contain', "Boom. It’s out there.")
    cy.get('div.gh-post-bookmark-title').should('contain', "(Untitled)")
    cy.contains('Back to editor').click()

    cy.get('textarea.gh-editor-title').type(postTitle)
    cy.get('div.kg-prose').type("El siguiente texto corresponde al cuerpo del post de prueba")
    cy.contains('Update').click()
    cy.wait(1000)
    cy.get('span.gh-notification-title').should('contain', "Updated")
  });

  Cypress.Commands.add('getByTestId', (testId) => {
    const log = Cypress.log({ name: 'getByTestId', message: testId })
    const selector = `[data-testId="${testId}"]`
    cy.get(selector)
  })

  Cypress.Commands.add('getByTestInput', (testInput) => {
    const log = Cypress.log({ name: 'getByTestInput', message: testInput })
    const selector = `[data-test-input="${testInput}"]`
    cy.get(selector)
  })  
}