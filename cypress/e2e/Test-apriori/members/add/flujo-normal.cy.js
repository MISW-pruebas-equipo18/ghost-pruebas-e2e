import { registerCommands } from '../../../../support/commands' 
import memberPage from '../../../../pages/5.73.2/memberPage'


registerCommands()

let user = Cypress.config('uservisitor')
let passw = Cypress.config('passwordvisitor')
let version = "v2"
let urlVisit = Cypress.config('baseUrlv2') + Cypress.env('url_members')

before(function() {
    //Login in Application
    cy.loginAdmin(user,passw,version)
    cy.url().should('include', '/dashboard')
    //cy.screenshot('5.73.2/members/add-member.cy.js/login')
})

describe('Add members', function(){ 

    beforeEach(function() {
        cy.fixture('members/add/flujocompleto').then((addMember) => {
          this.addMember = addMember
        })
    })
    
    it('P1: Add new member', function(){ 

        cy.on('uncaught:exception', (err, runnable) => {
            return false
        })

        // Given
        cy.visit(urlVisit)
        cy.wait(2000)
        cy.compareSnapshot('Add new member', 0.0)
        cy.compareSnapshot('Add new member', 0.1)
        //cy.screenshot('5.73.2/members/add-member.cy.js/P1-add-new-member-1')
        memberPage.addNewMember()
        cy.wait(1000)
        
        // When flujo normal
        const key = Math.floor(Math.random() * (9 - 1)) + 1
        let userMember = this.addMember[key].name
        let userEmail = this.addMember[key].email

        memberPage.typeUsername(userMember)
        memberPage.typeUseremail(userEmail)
        memberPage.saveMember()
        cy.wait(1000)
        // Then
        cy.visit(urlVisit)
        cy.wait(1000)
        memberPage.visibleMember(userMember)
        //cy.screenshot('5.73.2/members/add-member.cy.js/P1-add-new-member-2')
        cy.compareSnapshot('Add new member', 0.0)
        cy.compareSnapshot('Add new member', 0.1)

    })
    
})

after(() => {
    cy.logout()
    cy.url().should('include', '/signin')
    //cy.screenshot('5.73.2/members/add-member.cy.js/logout')
})