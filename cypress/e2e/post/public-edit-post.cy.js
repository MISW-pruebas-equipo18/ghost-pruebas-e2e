import { registerCommands } from '../../support/commands'
import homePage from '../../pages/homePage'
registerCommands()
let user = Cypress.config('user')
let passw = Cypress.config('passw')

describe ('Crear post vacío, actualizarlo y publicarlo', function(){
    it('Creación y actualización de post', function(){
        cy.createEditPost(user,passw,"Este es un post de prueba","public-edit-post")
        cy.url().should('include', '/posts')    
        cy.screenshot('Post/public-edit-post/P10_Posts')
      });
  });

  after(() => {
    cy.logout()
    cy.url().should('include', '/signin')
    cy.screenshot('SignIn/change-fullname/Logout')
  });  