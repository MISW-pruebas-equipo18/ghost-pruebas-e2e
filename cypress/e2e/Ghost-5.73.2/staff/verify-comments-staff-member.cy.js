import { registerCommands } from '../../../support/commands'

registerCommands()

let user = Cypress.config('userv2')
let passw = Cypress.config('passwv2')
let version = "v2"
describe ('Verify enable comments notifications', function(){
    before(( ) => {
        cy.loginAdmin(user,passw,version)
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