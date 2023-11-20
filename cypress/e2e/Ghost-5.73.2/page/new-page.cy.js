import {faker} from '@faker-js/faker';

import { registerCommands } from '../../../support/commands'
import homePage from '../../../pages/5.73.2/homePage'
import pagePage from '../../../pages/5.73.2/pagePage';

registerCommands()

let user = Cypress.config('userv2')
let passw = Cypress.config('passwv2')
let postPrefix = "ghost-5.73.2/new-page"
let tagName= ""
let version = "v2"

before(() => {
    //Login in Application
    cy.loginAdmin(user,passw,version)
    cy.url().should('include', '/dashboard')
    cy.screenshot('Page/'+ postPrefix +'/Login')
});

describe ('Create new Page', function(){
    
        it('Create Page', function(){
            homePage.goToPages()
            pagePage.createPage(faker.lorem.word(), faker.lorem.sentence())
            cy.screenshot('Page/'+ postPrefix +'/P1_CreatePage')
        });

        it('Verify Page', function(){
            pagePage.goToPageEditor()
            pagePage.returnToPages()
            pagePage.elements.pageItem().should('contain', tagName)
            cy.screenshot('Page/'+ postPrefix +'/P2_VerifyPage')
        });
});

after(() => {
    cy.logout()
    cy.url().should('include', '/signin')
    cy.screenshot('Page/'+ postPrefix +'/Logout')
  }); 