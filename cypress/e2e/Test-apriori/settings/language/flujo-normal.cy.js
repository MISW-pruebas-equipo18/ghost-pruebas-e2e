import { registerCommands } from '../../../../support/commands' 
import settingsPage from '../../../../pages/5.73.2/settingsPage'

registerCommands()

let user = Cypress.config('uservisitor')
let passw = Cypress.config('passwordvisitor')
let version = "v2"
let urlVisit = Cypress.config('baseUrlv2') + Cypress.env('url_settings') + '/publication-language'


before(function() {
    //Login in Application
    cy.loginAdmin(user,passw,version)
    cy.url().should('include', '/dashboard')
    //cy.screenshot('5.73.2/members/add-member.cy.js/login')
})

beforeEach(function() {
    cy.fixture('settings/language/flujocompleto').then((insertLanguage) => {
      this.insertLanguage = insertLanguage
    })
})

describe('Insert Language', function(){ 

    
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
        key = getRandom(1, 4);
        let lang = this.insertLanguage[key].lang
        settingsPage.typeCode(lang)
        settingsPage.saveLanguage()
        cy.wait(1000)
        // Then
        settingsPage.returnHomePage()


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