import {faker} from '@faker-js/faker';
import postPage from '../../../pages/5.73.2/postPage'
import { registerCommands } from '../../../support/commands'

registerCommands()
let user = Cypress.config('userv2')
let passw = Cypress.config('passwv2')
let postTitle = faker.lorem.words()
let version = "v2"
let postPrefix = "ghost-5.73.2/public-edit-delete-post"

describe ('Crear post, editarlo y eliminarlo, verificar que no aparezca de nuevo', function(){
    it('Creación y edición de post', function(){
        cy.createEditPost(user,passw,postTitle,postPrefix,version),
        cy.url().should('include', '/posts')    
        cy.screenshot('Post/'+ postPrefix +'/P10_Posts')
    });

    it('delete post', function(){
        cy.contains(postTitle).click()
        cy.screenshot('Post/'+ postPrefix +'/P11_Post')

        postPage.goToPostSettings()
        postPage.deletePost()

        cy.reload()
    });
  });

  after(() => {
    cy.logout()
    cy.url().should('include', '/signin')
    cy.screenshot('Post/'+ postPrefix +'/Logout')
  });  