import {faker} from '@faker-js/faker';
import postPage from '../../pages/postPage'
import { registerCommands } from '../../support/commands'

registerCommands()
let user = Cypress.config('user')
let passw = Cypress.config('passw')
let postTitle = faker.lorem.words()

describe ('Crear post, editarlo y eliminarlo, verificar que no aparezca de nuevo', function(){
    it('Creación y edición de post', function(){
        cy.createEditPost(user,passw,postTitle,"public-edit-delete-post")
        cy.url().should('include', '/posts')    
        cy.screenshot('Post/public-edit-delete-post/P10_Posts')
    });

    it('delete post', function(){
        cy.contains(postTitle).click()
        cy.screenshot('Post/public-edit-delete-post/P11_Post')

        postPage.goToPostSettings()
        postPage.deletePost()

        cy.reload()
    });
  });

  after(() => {
    cy.logout()
    cy.url().should('include', '/signin')
    cy.screenshot('SignIn/change-fullname/Logout')
  });  