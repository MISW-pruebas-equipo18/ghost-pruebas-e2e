import { registerCommands } from '../../../../support/commands' 
import settingsPage from '../../../../pages/5.73.2/settingsPage'

registerCommands()

let user = Cypress.config('uservisitor')
let passw = Cypress.config('passwordvisitor')
let version = "v2"
let urlVisit = Cypress.config('baseUrlv2') + Cypress.env('url_settings') + '/code-injection'
let urlVisitSite = Cypress.config('baseUrlv2')


before(function() {
    //Login in Application
    cy.loginAdmin(user,passw,version)
    cy.url().should('include', '/dashboard')
    //cy.screenshot('5.73.2/members/add-member.cy.js/login')
})

beforeEach(function() {
    cy.fixture('settings/codeinjection/flujocompleto').then((insertCode) => {
      this.insertCode = insertCode
    })
})

describe('Insert Code', function(){ 

    
    it('Insert Code', function(){ 

        cy.on('uncaught:exception', (err, runnable) => {
            return false
        })

        // Given
        cy.visit(urlVisit)
        cy.wait(2000)
        
        
        // When flujo normal
        settingsPage.clickEditCode()
        cy.wait(1000)
        key = getRandom(1, 4);
        let code = this.insertCode[key].code
        settingsPage.typeCode(code)
        settingsPage.saveCode()
        cy.wait(1000)
        settingsPage.returnHomePage()

        // Then
        cy.visit(urlVisitSite)
        cy.contains(code)


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