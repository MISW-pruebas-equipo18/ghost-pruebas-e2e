import { registerCommands } from '../../support/commands'

registerCommands()
let user = Cypress.config('user')
let passw = Cypress.config('passw')
let postTitle = "Este es un post de prueba para eliminación"

describe ('Crear post, editarlo y eliminarlo, verificar que no aparezca de nuevo', function(){
    it('Ingreso a la opción de post', function(){
        cy.createEditPost(user,passw,postTitle)
        cy.contains('Posts').click()
        cy.url().should('include', '/posts')
        cy.contains(postTitle).click()
        cy.get('button.settings-menu-toggle').click()
        cy.contains('Delete post').click()
        //cy.get('header.modal-header').should('include', 'Are you sure you want to delete this')
        cy.get('button.gh-btn-red').click({force: true})
        cy.get('h3.gh-content-entry-title').should('not.exist', postTitle)
      });
  });