import { registerCommands } from '../../../support/commands' 
import memberPage from '../../../pages/5.73.2/memberPage'

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

beforeEach(function() {
    cy.fixture('members/add/flujocompleto').then((addMember) => {
      this.addMember = addMember
    })
    cy.visit(urlVisit)
    cy.wait(2000)
})

describe('Add members', function(){ 

    
    it('P1: Add new member', function(){ 

        cy.on('uncaught:exception', (err, runnable) => {
            return false
        })
        
        memberPage.addNewMember()
        cy.wait(1000)
        
        // When flujo normal
        key = getRandom(1, 9);
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
        //cy.screenshot('5.73.2/members/add-member.cy.js/P1-add-new-member')

    })
    
})

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

after(() => {
    cy.logout()
    cy.url().should('include', '/signin')
    //cy.screenshot('5.73.2/members/add-member.cy.js/logout')
})