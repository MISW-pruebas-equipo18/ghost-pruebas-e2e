import { registerCommands } from '../../support/commands'
import memberPage from '../../pages/memberPage'
import {faker} from '@faker-js/faker';

registerCommands()

let user = Cypress.config('user')
let passw = Cypress.config('passw')
let newuserEmail = faker.internet.email() 

before(() => {
    //Login in Application
    cy.loginAdmin(user,passw)
    cy.url().should('include', '/dashboard')
    cy.screenshot('members/edit-member.cy.js/login')
});

describe ('Edit members', function(){

    it('P2: edit current member', function(){
      
        cy.on('uncaught:exception', (err, runnable) => {
            return false
        })
        // Given
        cy.visit(Cypress.env('url_members'))
        cy.wait(2000)
        // When
        //cy.contains(user.currentEmail).click()
        memberPage.getMember()
        cy.wait(1000)
        memberPage.clearEmailMember()
        memberPage.typeNewUseremail(newuserEmail)
        cy.wait(2000)
        memberPage.saveMember()
        cy.wait(2000)

        // Then
        cy.visit(Cypress.env('url_members'))
        memberPage.visibleEmailMember(newuserEmail)
        cy.screenshot('members/edit-member.cy.js/P2-edit-current-member')

    });

});

after(() => {
    cy.logout()
    cy.url().should('include', '/signin')
    cy.screenshot('members/edit-member.cy.js/logout')
}); 