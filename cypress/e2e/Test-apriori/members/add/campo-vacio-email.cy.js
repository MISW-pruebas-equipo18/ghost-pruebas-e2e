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



describe ('Add members - empty inputs', function(){ 

    beforeEach(function() {
        cy.fixture('members/add/camposvacios').then((addMemberEmptyInput) => {
            this.addMemberEmptyInput = addMemberEmptyInput
        })
    })    

    it('Add new member - empty inputs', function(){
    
        cy.on('uncaught:exception', (err, runnable) => {
            return false
        })
  
        // Given
        cy.contains('Members').click(),
        console.log(urlVisit)
        cy.visit(urlVisit, { timeout: 3000})
        cy.wait(1000)
        // When
        memberPage.addNewMember()
        cy.wait(1000)
        
        // When flujo normal
        const key = Math.floor(Math.random() * (9 - 1)) + 1
        let userMember2 = this.addMemberEmptyInput[key].name

        memberPage.typeUsername(userMember2)
        memberPage.saveMember()
        cy.wait(1000)
        // Then
        cy.contains('Retry').should('be.visible')
        cy.contains('Dashboard').click()
        cy.contains('Leave').click()
        //cy.screenshot('5.73.2/members/add-member.cy.js/P1-add-new-member')
        cy.compareSnapshot('empty email input', 0.0)
        cy.compareSnapshot('empty email input', 0.1)

    })    
})

after(() => {
    cy.logout()
    cy.url().should('include', '/signin')
    //cy.screenshot('5.73.2/members/add-member.cy.js/logout')
}) 