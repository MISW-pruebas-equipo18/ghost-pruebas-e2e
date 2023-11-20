import { registerCommands } from '../../../support/commands' 
import memberPage from '../../../pages/memberPage'
import {faker} from '@faker-js/faker';

registerCommands()

let user = Cypress.config('uservisitor')
let passw = Cypress.config('passwordvisitor')
let userMember = faker.internet.displayName()
let userEmail = faker.internet.email() 

before(() => {
    //Login in Application
    cy.loginAdmin(user,passw)
    cy.url().should('include', '/dashboard')
    cy.screenshot('5.73.2/members/add-member.cy.js/login')
});

describe ('Add members', function(){  

    it('P1: Add new member', function(){
        cy.on('uncaught:exception', (err, runnable) => {
            return false
        })
        // Given
        cy.visit(Cypress.env('url_members'))
        // When
        memberPage.addNewMember()
        cy.wait(1000)
        
        memberPage.typeUsername(userMember)
        memberPage.typeUseremail(userEmail)
        memberPage.saveMember()
        cy.wait(1000)
        // Then
        cy.visit(Cypress.env('url_members'))
        cy.wait(1000)
        memberPage.visibleMember(userMember)
        cy.screenshot('5.73.2/members/add-member.cy.js/P1-add-new-member')

    });
});

after(() => {
    cy.logout()
    cy.url().should('include', '/signin')
    cy.screenshot('5.73.2/members/add-member.cy.js/logout')
}); 