import { registerCommands } from '../../support/commands'

registerCommands()
let user = Cypress.config('user')
let passw = Cypress.config('passw')

describe ('Crear post vacío, actualizarlo y publicarlo', function(){
    it('Creación y actualización de post', function(){
        cy.createEditPost(user,passw,"Este es un post de prueba")
      });
  });