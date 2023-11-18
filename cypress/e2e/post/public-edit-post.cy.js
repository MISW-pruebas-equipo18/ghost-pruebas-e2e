import {faker} from '@faker-js/faker';
import { registerCommands } from '../../support/commands'
registerCommands()
let user = Cypress.config('user')
let passw = Cypress.config('passw')
let postTitle = faker.lorem.words()
describe ('Crear post vacío, actualizarlo y publicarlo', function(){
    it('Creación y actualización de post', function(){
        cy.createEditPost(user,passw,postTitle,"public-edit-post")
        cy.url().should('include', '/posts')    
        cy.screenshot('Post/public-edit-post/P10_Posts')
      });
  });

  after(() => {
    cy.logout()
    cy.url().should('include', '/signin')
    cy.screenshot('SignIn/change-fullname/Logout')
  });  