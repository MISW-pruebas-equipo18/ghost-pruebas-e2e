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
    cy.wait(2000)
    //cy.screenshot('5.73.2/members/add-member.cy.js/login')
})

beforeEach(function() {
    cy.fixture('members/add/camposvacios').then((addMemberEmptyInput) => {
        this.addMemberEmptyInput = addMemberEmptyInput
    })
})

describe ('Add members - empty input', function(){ 

    it('Add new member - empty input', function(){
    
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
        key = getRandom(1, 9);
        let userMember2 = this.addMemberEmptyInput[key].name

        memberPage.typeUsername(userMember2)
        memberPage.saveMember()
        cy.wait(1000)
        // Then
        memberPage.notSaveMember()
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