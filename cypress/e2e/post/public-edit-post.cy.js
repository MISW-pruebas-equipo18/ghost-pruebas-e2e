import { registerCommands } from '../../support/commands'

registerCommands()
let user = Cypress.config('user')
let passw = Cypress.config('passw')

describe ('Get in Post', function(){
    it('Ingreso a la opción de post', function(){
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

        cy.get('textarea.gh-editor-title').type("Este es un post de prueba")
        cy.get('div.kg-prose').type("El siguiente texto corresponde al cuerpo del post de prueba")
        cy.contains('Update').click()
        cy.wait(1000)
        cy.get('span.gh-notification-title').should('contain', "Updated")
      });
  });