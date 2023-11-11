import { registerCommands } from '../../support/commands'

registerCommands()
let user = Cypress.config('user')
let passw = Cypress.config('passw')

describe ('Get in Post', function(){
    it('Ingreso a la opción de post', function(){
        cy.login(user,passw)
        cy.contains('Posts').click()
      });
  });