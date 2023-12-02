import { registerCommands } from '../../../../support/commands' 
import memberPage from '../../../../pages/5.73.2/memberPage'

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
})


describe ('Edit members', function(){

    beforeEach(function() {
        cy.fixture('members/edit/camposvacios').then((editEmail) => {
          this.editEmail = editEmail
        })
    })    

    it('P2: edit current member', function(){

        cy.on('uncaught:exception', (err, runnable) => {
            return false
        })
        // Given
        cy.visit(urlVisit)
        cy.wait(2000)
        // When
        cy.compareSnapshot('incorrect format email', 0.0)
        cy.compareSnapshot('incorrect format email', 0.1)
        memberPage.getMember()
        cy.wait(1000)
        memberPage.clearEmailMember()
        const key = Math.floor(Math.random() * (9 - 1)) + 1
        memberPage.typeUseremail(this.editEmail[key].email)
        cy.wait(2000)
        memberPage.saveMember()
        cy.wait(1000)

        // Then
        cy.contains('Retry').should('be.visible')
        cy.contains('Dashboard').click()
        cy.contains('Leave').click()
        //cy.screenshot('5.73.2/members/edit-member.cy.js/P2-edit-current-member')
        cy.compareSnapshot('incorrect format email', 0.0)
        cy.compareSnapshot('incorrect format email', 0.1)

    })

})

after(() => {
    cy.logout()
    cy.url().should('include', '/signin')
    //cy.screenshot('5.73.2/members/edit-member.cy.js/logout')
}) 