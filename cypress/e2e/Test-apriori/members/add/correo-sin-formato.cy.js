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
    cy.wait(2000)
    //cy.screenshot('5.73.2/members/add-member.cy.js/login')
})

describe ('Add members - error email format', function(){ 

    beforeEach(function() {
        cy.fixture('members/add/correosinformato').then((addMemberErrorEmail) => {
            this.addMemberErrorEmail = addMemberErrorEmail
        })
    })    

    it('Add new member - error email format', function(){
    
        cy.on('uncaught:exception', (err, runnable) => {
            return false
        })
  
        // Given
        cy.visit(urlVisit)
        cy.wait(1000)
        memberPage.addNewMember()
        cy.wait(1000)
        
        // When flujo normal
        const key = Math.floor(Math.random() * (9 - 1)) + 1
        let userMember2 = this.addMemberErrorEmail[key].name
        let userEmail2 = this.addMemberErrorEmail[key].email

        memberPage.typeUsername(userMember2)
        memberPage.typeUseremail(userEmail2)
        memberPage.saveMember()
        cy.wait(1000)
        // Then
        cy.contains('Retry').should('be.visible')
        cy.contains('Dashboard').click()
        cy.contains('Leave').click()
        //cy.screenshot('5.73.2/members/add-member.cy.js/P1-add-new-member')
        cy.compareSnapshot('Add new member - error email');
    })    
})

after(() => {
    cy.logout()
    cy.url().should('include', '/signin')
    //cy.screenshot('5.73.2/members/add-member.cy.js/logout')
}) 