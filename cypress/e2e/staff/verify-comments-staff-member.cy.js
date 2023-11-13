import { registerCommands } from '../../support/commands'

registerCommands()

let user = Cypress.env('user')
let passw = Cypress.env('passw')

describe ('Verify enable comments notifications', function(){
    before(( ) => {
        cy.login(user,passw)
        cy.url().should('include', '/dashboard')
    })

    it('Enable from owner staff user', function(){
        cy.visit(Cypress.env('url_staff'))
        cy.getByTestId('owner-user').click()
        cy.wait(2000)
        cy.get('input[type="checkbox"]').eq(0).should('be.checked')
        cy.contains('Save & close').click()
    });
});