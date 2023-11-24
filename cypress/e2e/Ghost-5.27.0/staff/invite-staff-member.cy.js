import { registerCommands } from '../../../support/commands'
import staffPage from '../../../pages/5.27.0/staffPage'
import {faker} from '@faker-js/faker';

registerCommands()

let user = Cypress.config('user')
let passw = Cypress.config('passw')
let emailUserInvited = faker.internet.email() 
let urlVisit = Cypress.config('baseUrl') + Cypress.env('url_staff')
before(() => {
    //Login in Application
    cy.loginAdmin(user,passw)
    cy.url().should('include', '/dashboard')
    cy.screenshot('5.27.0/staff/invite-staff-member.cy.js/login')
});

describe ('Invite staff member', function(){

    it('P3: Invite staff member', function(){
        // Given
        cy.visit(urlVisit)
        // When 
        staffPage.btnInvite()
        staffPage.typeInviteMemberOldVersion(emailUserInvited)
        staffPage.sendInvitation()
        // Then
        cy.screenshot('5.27.0/staff/invite-staff-member.cy.js/P3-invite-staff-member') 
    });

});

after(() => {
    cy.logout()
    cy.url().should('include', '/signin')
    cy.screenshot('5.27.0/staff/invite-staff-member.cy.js/logout')
}); 