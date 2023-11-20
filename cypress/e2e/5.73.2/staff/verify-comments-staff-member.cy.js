import { registerCommands } from '../../../support/commands'
import staffPage from '../../../pages/staffPage'

registerCommands()

let user = Cypress.config('uservisitor')
let passw = Cypress.config('passwordvisitor')

before(() => {
    //Login in Application
    cy.loginAdmin(user,passw)
    cy.url().should('include', '/dashboard')
    cy.screenshot('5.73.2/staff/verify-comments-staff-member.cy.js/login')
});

describe ('P4: Verify enable comments notifications', function(){

    it('P4: Verify enable comments notifications', function(){
        // Given
        cy.wait(1000)
        cy.visit(Cypress.env('url_staff'))
        cy.wait(2000)
        // When 
        staffPage.clickBtnProfile()
        cy.wait(2000)
        // Then
        staffPage.verifyCheckedComments()
        cy.screenshot('5.73.2/staff/verify-comments-staff-member.cy.js/P3-verify-enable-comments-notifications')
        staffPage.saveProfile()
        cy.contains('Done').click()
    });
});

after(() => {
    cy.logout()
    cy.url().should('include', '/signin')
    cy.screenshot('5.73.2/staff/verify-comments-staff-member.cy.js/logout')
}); 