import { registerCommands } from '../../../support/commands'
import staffPage from '../../../pages/staffPage'
import {faker} from '@faker-js/faker';

registerCommands()

let user = Cypress.config('userv2')
let passw = Cypress.config('passwv2')
let emailUserInvited = faker.internet.email() 
let urlVisit = Cypress.config('baseUrlv2') + Cypress.env('url_staff')
let urlVisit2 = Cypress.config('baseUrlv2') + Cypress.env('url_invite')
let version = "v2"
before(() => {
    //Login in Application
    cy.loginAdmin(user,passw,version)
    cy.url().should('include', '/dashboard')
    cy.screenshot('5.73.2/staff/invite-staff-member.cy.js/login')
});

describe ('Invite staff member', function(){

    it('P3: Invite staff member', function(){
        // Given
        cy.visit(urlVisit)
        // When 
        staffPage.btnInvite()
        staffPage.includeUrl(CurlVisit2)
        staffPage.typeInviteMember(emailUserInvited)
        staffPage.sendInvitation()
        // Then
        cy.screenshot('5.73.2/staff/invite-staff-member.cy.js/P3-invite-staff-member') 
    });

});

after(() => {
    cy.logout()
    cy.url().should('include', '/signin')
    cy.screenshot('5.73.2/staff/invite-staff-member.cy.js/logout')
}); 