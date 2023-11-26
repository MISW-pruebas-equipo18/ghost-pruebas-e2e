import { registerCommands } from '../../../../support/commands' 
import memberPage from '../../../../pages/5.73.2/memberPage'
import {faker} from '@faker-js/faker';

registerCommands()

let user = Cypress.config('uservisitor')
let passw = Cypress.config('passwordvisitor')
let userMember = faker.internet.displayName()
let userEmail = faker.internet.email() 
let version = "v2"
let urlVisit = Cypress.config('baseUrlv2') + Cypress.env('url_members')
before(() => {
    //Login in Application
    cy.loginAdmin(user,passw,version)
    cy.url().should('include', '/dashboard')
    //cy.screenshot('5.73.2/members/add-member.cy.js/login')
});

describe ('Add members', function(){  

    it('P1: Add new member', function(){
        cy.on('uncaught:exception', (err, runnable) => {
            return false
        })
        // Given
        cy.visit(urlVisit)
        // When
        memberPage.addNewMember()
        cy.wait(1000)
        
        memberPage.typeUsername(userMember)
        memberPage.typeUseremail(userEmail)
        memberPage.saveMember()
        cy.wait(1000)
        // Then
        cy.visit(urlVisit)
        cy.wait(1000)
        memberPage.visibleMember(userMember)
        //cy.screenshot('5.73.2/members/add-member.cy.js/P1-add-new-member')

    });
});

after(() => {
    cy.logout()
    cy.url().should('include', '/signin')
    //cy.screenshot('5.73.2/members/add-member.cy.js/logout')
}); 