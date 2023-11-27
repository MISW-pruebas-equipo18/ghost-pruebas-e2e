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



describe('Insert recommendations', function(){ 


    beforeEach(function() {
        cy.fixture('settings/recommendations/flujocompleto').then((insertRecommendations) => {
          this.insertRecommendations = insertRecommendations
        })
    })
    
    it('Insert recommendations', function(){ 

        cy.on('uncaught:exception', (err, runnable) => {
            return false
        })
        
        // Given
        cy.visit(urlVisit)
        cy.wait(2000)

        // When flujo normal
        settingsPage.clickEditRecommendations()
        const key = Math.floor(Math.random() * (4 - 1)) + 1
        let urlRecommendations = this.insertRecommendations[key].url
        settingsPage.typeInputRecommendations(urlRecommendations)
        cy.contains('Next').click()
        cy.wait(1000)
        cy.contains('Add').click()
        cy.wait(1000)

        // Then
        //cy.get('#your-recommendations > .ml-1\.5').invoke('text').should('match', /^[0-9]*$/)


    })
    
})

after(() => {
    cy.logout()
    cy.url().should('include', '/signin')
    //cy.screenshot('5.73.2/members/add-member.cy.js/logout')
})