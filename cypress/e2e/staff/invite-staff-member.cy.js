import { registerCommands } from '../../support/commands'

registerCommands()

let user = Cypress.env('user')
let passw = Cypress.env('passw')

describe ('Invite member staff', function(){
    before(( ) => {
        cy.login(user,passw)
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