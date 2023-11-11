import { registerCommands } from '../../../pruebas-cypress/cypress/support/commands'

registerCommands()

describe ('Get in Post', function(){
    it('Ingreso a la opción de post', function(){
        cy.login()
        cy.contains('Posts').click()
      });
  });