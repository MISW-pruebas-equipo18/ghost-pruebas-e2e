import { registerCommands } from '../../../../support/commands' 
import settingsPage from '../../../../pages/5.73.2/settingsPage'

registerCommands()

let user = Cypress.config('uservisitor')
let passw = Cypress.config('passwordvisitor')
let version = "v2"
let urlVisit = Cypress.config('baseUrlv2') + Cypress.env('url_settings')


before(() => {
    //Login in Application
    cy.loginAdmin(user,passw,version)
    cy.url().should('include', '/dashboard')
    //cy.screenshot('5.73.2/members/add-member.cy.js/login')
})

describe('Insert Language', function(){ 


    beforeEach(function() {
        cy.fixture('settings/language/flujocompleto').then((insertLanguage) => {
          this.insertLanguage = insertLanguage
        })
    })    
    
    it('Insert Language', function(){ 

        cy.on('uncaught:exception', (err, runnable) => {
            return false
        })

        // Given
        cy.visit(urlVisit)
        cy.wait(2000)
        
        // When flujo normal
        settingsPage.clickEditLanguage()
        cy.wait(1000)
        const key = Math.floor(Math.random() * (4 - 1)) + 1
        let lang = this.insertLanguage[key].lang
        settingsPage.elements.inputLanguage().clear()
        settingsPage.typeLang(lang)
        settingsPage.saveLanguage()
        cy.wait(1000)
        // Then
        settingsPage.returnHomePage()


    })
    
})

after(() => {
    cy.logout()
    cy.url().should('include', '/signin')
    //cy.screenshot('5.73.2/members/add-member.cy.js/logout')
})