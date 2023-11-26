import { registerCommands } from '../../../../support/commands' 
import settingsPage from '../../../../pages/5.73.2/settingsPage'

registerCommands()

let user = Cypress.config('uservisitor')
let passw = Cypress.config('passwordvisitor')
let version = "v2"
let urlVisit = Cypress.config('baseUrlv2') + Cypress.env('url_settings') + '/recommendations'


before(function() {
    //Login in Application
    cy.loginAdmin(user,passw,version)
    cy.url().should('include', '/dashboard')
    //cy.screenshot('5.73.2/members/add-member.cy.js/login')
})

beforeEach(function() {
    cy.fixture('settings/recommendations/flujocompleto').then((insertRecommendations) => {
      this.insertRecommendations = insertRecommendations
    })
})

describe('Insert recommendations', function(){ 

    
    it('Insert recommendations', function(){ 

        cy.on('uncaught:exception', (err, runnable) => {
            return false
        })
        
        // Given
        cy.visit(urlVisit)
        cy.wait(2000)

        // When flujo normal
        settingsPage.clickEditRecommendations()
        cy.wait(1000)
        key = getRandom(1, 4)
        let urlRecommendations = this.insertRecommendations[key].url
        settingsPage.typeInputRecommendations(urlRecommendations)
        cy.contains('Next').click()
        cy.wait(1000)
        cy.contains('Add').click()
        cy.wait(1000)

        // Then
        cy.get('#your-recommendations > .ml-1\.5').invoke('text').should('match', /^[0-9]*$/)


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