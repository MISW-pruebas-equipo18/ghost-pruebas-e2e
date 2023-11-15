import { registerCommands } from '../../support/commands'

registerCommands()

let user = Cypress.env('user')
let passw = Cypress.env('passw')

describe ('Add members', function(){

    before(( ) => {
        cy.login(user,passw)
        cy.url().should('include', '/dashboard')
    })    

    it('Add new member', function(){
        const user = {
            name: 'Jose Bocanegra',
            email: 'josebocanegra@uniandes.edu.co'
        };
        
        cy.on('uncaught:exception', (err, runnable) => {
            return false
        })
        cy.visit(Cypress.env('url_members'))
        cy.contains('New member').click()
        cy.wait(1000)
        cy.getByTestInput('member-name').type(user.name)
        cy.getByTestInput('member-email').type(user.email)
        cy.contains('Save').click()
    });

    it('Verify new member', function(){
        cy.visit(Cypress.env('url_members'))
        cy.contains('josebocanegra@uniandes.edu.co').should('be.visible')
    });
});