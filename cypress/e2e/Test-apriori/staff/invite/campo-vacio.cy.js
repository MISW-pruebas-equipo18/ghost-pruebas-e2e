import { registerCommands } from '../../../../support/commands'
import staffPage from '../../../../pages/5.73.2/staffPage'


registerCommands()

let user = Cypress.config('uservisitor')
let passw = Cypress.config('passwordvisitor')
let urlVisit = Cypress.config('baseUrlv2') + Cypress.env('url_staff')
let urlVisit2 = Cypress.config('baseUrlv2') + Cypress.env('url_invite')
let version = "v2"

before(() => {
    //Login in Application
    cy.loginAdmin(user,passw,version)
    cy.url().should('include', '/dashboard')
    //cy.screenshot('5.73.2/staff/invite-staff-member.cy.js/login')
})

beforeEach(function() {
    cy.fixture('staff/invite/camposvacios').then((insertEmptyEmail) => {
      this.insertEmptyEmail = insertEmptyEmail
    })
})

describe ('Invite staff member', function(){

    it('P3: Invite staff member', function(){
        // Given
        cy.visit(urlVisit)
        // When 
        staffPage.btnInvite()
        staffPage.includeUrl(CurlVisit2)
        key = getRandom(1, 9);
        staffPage.typeInviteMember(this.insertEmptyEmail[key].email)
        staffPage.sendInvitation()
        cy.wait(2000)
        // Then
        cy.contains('Please enter a valid email address.')  
        //cy.screenshot('5.73.2/staff/invite-staff-member.cy.js/P3-invite-staff-member') 
    })

})

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

after(() => {
    cy.logout()
    cy.url().should('include', '/signin')
    //cy.screenshot('5.73.2/staff/invite-staff-member.cy.js/logout')
}) 