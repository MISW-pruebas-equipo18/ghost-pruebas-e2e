import { registerCommands } from '../../../../support/commands' 
import settingsPage from '../../../../pages/5.73.2/settingsPage'

registerCommands()

let user = Cypress.config('uservisitor')
let passw = Cypress.config('passwordvisitor')
let version = "v2"
let urlVisit = Cypress.config('baseUrlv2') + Cypress.env('url_settings')
let urlVisitSite = Cypress.config('baseUrlv2')


before(() => {
    //Login in Application
    cy.loginAdmin(user,passw,version)
    cy.url().should('include', '/dashboard')
    //cy.screenshot('5.73.2/members/add-member.cy.js/login')
})

describe('Insert Code', function(){ 

    beforeEach(function() {
        cy.fixture('settings/codeinjection/flujocompleto').then((insertCode) => {
          this.insertCode = insertCode
        })
    })
    
    
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
        const key = Math.floor(Math.random() * (4 - 1)) + 1
        let code = this.insertCode[key].code
        cy.wait(1000)
        settingsPage.typeCode(code)
        settingsPage.saveCode()
        cy.wait(1000)
        settingsPage.returnHomePage()

        // Then
        cy.visit(urlVisitSite)
        cy.contains(code).should('be.visible')
        cy.visit(Cypress.env('url_dashboard'))
        cy.wait(1000)


    })
    
})

after(() => {
    cy.logout()
    cy.url().should('include', '/signin')
    //cy.screenshot('5.73.2/members/add-member.cy.js/logout')
})