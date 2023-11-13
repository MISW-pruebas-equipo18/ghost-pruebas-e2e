import { registerCommands } from '../../support/commands'

registerCommands()


describe ('Edit members', function(){

    const user = {
        currentEmail: 'josebocanegra@uniandes.edu.co',
        newEmail: 'jbnegra@gmail.com', 
    };

    it('edit current member', function(){
      
        cy.on('uncaught:exception', (err, runnable) => {
            return false
        })
        cy.visit(Cypress.env('url_members'))
        cy.contains(user.currentEmail).click()
        cy.wait(1000)
        cy.getByTestInput('member-email').clear()
        cy.getByTestInput('member-email').type(user.newEmail)
        cy.contains('Save').click()
    });

    it('Verify edit member', function(){
        cy.visit(Cypress.env('url_members'))
        cy.contains(user.newEmail).should('be.visible')
    });
});