import { registerCommands } from '../../../pruebas-cypress/cypress/support/commands'
registerCommands()
let user = 'eg.romeror1@uniandes.edu.co'
let passw = 'GioR2023@@'
describe ('Get in Post', function(){
    it('Ingreso a la opción de post', function(){
        cy.login(user,passw)
      });
  });