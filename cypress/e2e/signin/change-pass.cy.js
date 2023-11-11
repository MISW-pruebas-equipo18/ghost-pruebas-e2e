import { registerCommands } from '../../support/commands'
registerCommands()

let user = Cypress.config('user')
let passw = Cypress.config('passw')

describe ('Validate change of password', function(){
    it('Ingreso al sistema', function(){
        cy.login(user,passw)
    });
});