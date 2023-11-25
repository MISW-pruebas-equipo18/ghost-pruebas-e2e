import { registerCommands } from '../../../support/commands' 
import memberPage from '../../../pages/5.73.2/memberPage'

registerCommands()

let user = Cypress.config('uservisitor')
let passw = Cypress.config('passwordvisitor')
let version = "v2"
let urlVisit = Cypress.config('baseUrlv2') + Cypress.env('url_members')

before(() => {
    //Login in Application
    cy.loginAdmin(user,passw,version)
    cy.url().should('include', '/dashboard')
    //cy.screenshot('5.73.2/members/edit-member.cy.js/login')
});

beforeEach(function() {
    cy.fixture('members/edit-member').then((editMember) => {
      this.editMember = editMember
    })
})

describe ('Edit members', function(){

    it('P2: edit current member', function(){

        cy.on('uncaught:exception', (err, runnable) => {
            return false
        })
        // Given
        cy.visit(urlVisit)
        cy.wait(2000)
        // When
        //cy.contains(user.currentEmail).click()
        memberPage.getMember()
        cy.wait(1000)
        memberPage.clearEmailMember()
        key = getRandom(1, 9);
        memberPage.typeNewUseremail(this.editMember[key].email)
        cy.wait(2000)
        memberPage.saveMember()
        cy.wait(2000)

        // Then
        cy.visit(urlVisit)
        memberPage.visibleEmailMember(this.editMember[key].email)
        //cy.screenshot('5.73.2/members/edit-member.cy.js/P2-edit-current-member')

    });

});

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

after(() => {
    cy.logout()
    cy.url().should('include', '/signin')
    //cy.screenshot('5.73.2/members/edit-member.cy.js/logout')
}); 