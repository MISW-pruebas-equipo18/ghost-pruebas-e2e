import {faker} from '@faker-js/faker';
import { registerCommands } from '../../../support/commands'
registerCommands()
let user = Cypress.config('userv2')
let passw = Cypress.config('passwv2')
let postTitle = faker.lorem.words()
let version = "v2"
let postPrefix = "ghost-5.73.2/public-edit-post"

describe ('Crear post vacío, actualizarlo y publicarlo', function(){
    it('Creación y actualización de post', function(){
        cy.createEditPost(user,passw,postTitle,postPrefix,version)
        cy.url().should('include', '/posts')    
        cy.screenshot('Post/'+ postPrefix +'/P10_Posts')
      });
  });

  after(() => {
    cy.logout()
    cy.url().should('include', '/signin')
    cy.screenshot('Post/'+ postPrefix +'/Logout')
  });  