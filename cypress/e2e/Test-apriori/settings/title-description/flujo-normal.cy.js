import { registerCommands } from '../../../../support/commands' 
import settingsPage from '../../../../pages/5.73.2/settingsPage'

registerCommands()

let user = Cypress.config('uservisitor')
let passw = Cypress.config('passwordvisitor')
let version = "v2"
let urlVisit = Cypress.config('baseUrlv2') + Cypress.env('url_settings')
let urlVisitSite = Cypress.config('baseUrlv2')

before(function() {
    //Login in Application
    cy.loginAdmin(user,passw,version)
    cy.url().should('include', '/dashboard')
    //cy.screenshot('5.73.2/members/add-member.cy.js/login')
})



describe('Insert title and description', function(){ 


    beforeEach(function() {
        cy.fixture('settings/titledescription/flujocompleto').then((insertTitleDescription) => {
          this.insertTitleDescription = insertTitleDescription
        })
    })
    
    it('Insert title and description', function(){ 

        cy.on('uncaught:exception', (err, runnable) => {
            return false
        })

        // Given
        cy.visit(urlVisit)
        cy.wait(2000)        
    
        // When flujo normal
        settingsPage.clickEditTitleDescription()
        cy.wait(1000)
        settingsPage.clearTitle()
        settingsPage.clearDescription()
        cy.wait(1000)
        const key = Math.floor(Math.random() * (4 - 1)) + 1
        let title = insertTitleDescription[key].title
        let description = insertTitleDescription[key].description
        settingsPage.typeInputTitle(title)
        settingsPage.typeInputDescription(description)
        settingsPage.saveTitleDescription()
        cy.wait(1000)

        // Then
        cy.visit(urlVisitSite)
        cy.title().should('eq',title)


    })
    
})

after(() => {
    cy.logout()
    cy.url().should('include', '/signin')
    //cy.screenshot('5.73.2/members/add-member.cy.js/logout')
})