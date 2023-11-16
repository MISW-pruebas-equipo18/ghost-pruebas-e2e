import { registerCommands } from '../../support/commands'

registerCommands()
let user = Cypress.config('user')
let passw = Cypress.config('passw')
let postTitle = "Este es un post de prueba para eliminación"

describe ('Crear post, editarlo y eliminarlo, verificar que no aparezca de nuevo', function(){
    it('Creación y edición de post', function(){
        cy.createEditPost(user,passw,postTitle,"public-edit-delete-post")
        cy.get('button.gh-notification-close').click()
    });

    it('delete post', function(){
        cy.contains('Posts').click()
        cy.url().should('include', '/posts')
        cy.screenshot('Post/public-edit-delete-post/P10_Posts')

        cy.contains(postTitle).click()
        cy.screenshot('Post/public-edit-delete-post/P11_Post')

        cy.get('button.settings-menu-toggle').click()
        cy.contains('Delete post').click()
        //cy.get('header.modal-header').should('include', 'Are you sure you want to delete this')
        cy.get('button.gh-btn-red').click({force: true})
        cy.visit('http://localhost:2368/ghost/#/signin')
        cy.wait(3000)

        cy.logout()
    });
  });