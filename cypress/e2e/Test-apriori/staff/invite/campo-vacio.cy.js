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

describe ('Invite staff member', function(){

    beforeEach(function() {
        cy.fixture('staff/invite/camposvacios').then((insertEmptyEmail) => {
          this.insertEmptyEmail = insertEmptyEmail
        })
    })    

    it('P3: Invite staff member', function(){
        // Given
        cy.visit(urlVisit)
        // When 
        staffPage.btnInvite()
        cy.wait(1000)
        const key = Math.floor(Math.random() * (9 - 1)) + 1
        staffPage.typeInviteMember(this.insertEmptyEmail[key].email)
        staffPage.sendInvitation()
        cy.wait(2000)
        // Then
        cy.contains('Please enter a valid email address.')
        cy.clickOutside() 
        cy.contains('Done').click() 
        //cy.screenshot('5.73.2/staff/invite-staff-member.cy.js/P3-invite-staff-member') 
    })

})

after(() => {
    cy.logout()
    cy.url().should('include', '/signin')
    //cy.screenshot('5.73.2/staff/invite-staff-member.cy.js/logout')
}) 