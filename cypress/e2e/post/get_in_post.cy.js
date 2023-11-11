import { registerCommands } from '../../support/commands'

registerCommands()
let user = 'xxxxxxxx'
let passw = 'xxxxxxxx'

describe ('Get in Post', function(){
    it('Ingreso a la opción de post', function(){
        cy.login(user,passw)
        cy.contains('Posts').click()
      });
  });