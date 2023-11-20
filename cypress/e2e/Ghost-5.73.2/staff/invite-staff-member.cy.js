import { registerCommands } from '../../../support/commands'

registerCommands()

let user = Cypress.config('userv2')
let passw = Cypress.config('passwv2')
let version = "v2"
describe ('Invite member staff', function(){
    before(( ) => {
        cy.loginAdmin(user,passw,version)
        cy.url().should('include', '/dashboard')
    })

    it('Invite member', function(){
        cy.visit(Cypress.env('url_staff'))
        cy.contains('Invite people').click()
        cy.url().should('include', '/invite')
        cy.get(".peer").type('albertogalvis@protonmail.com')
        cy.contains('Send invitation now').click()
    });
});