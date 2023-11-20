import { registerCommands } from '../../support/commands'
import staffPage from '../../pages/staffPage'
import {faker} from '@faker-js/faker';

registerCommands()

let user = Cypress.config('user')
let passw = Cypress.config('passw')
let emailUserInvited = faker.internet.email() 

before(() => {
    //Login in Application
    cy.loginAdmin(user,passw)
    cy.url().should('include', '/dashboard')
    cy.screenshot('staff/invite-staff-member.cy.js/login')
});

describe ('Invite staff member', function(){

    it('P3: Invite staff member', function(){
        // Given
        cy.visit(Cypress.env('url_staff'))
        // When 
        staffPage.btnInvite()
        staffPage.includeUrl(Cypress.env('url_invite'))
        staffPage.typeInviteMember(emailUserInvited)
        staffPage.sendInvitation()
        // Then
        cy.screenshot('staff/invite-staff-member.cy.js/P3-invite-staff-member') 
    });

});

after(() => {
    cy.logout()
    cy.url().should('include', '/signin')
    cy.screenshot('staff/invite-staff-member.cy.js/logout')
}); 