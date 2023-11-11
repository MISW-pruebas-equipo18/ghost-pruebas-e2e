import { registerCommands } from '../../support/commands'
registerCommands()
let user = 'xxxxxxxx'
let passw = 'xxxxxxxxxx'
describe ('Get in Post', function(){
    it('Ingreso a la opción de post', function(){
        cy.login(user,passw)
      });
  });