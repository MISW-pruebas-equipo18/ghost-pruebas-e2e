import {faker} from '@faker-js/faker';

import { registerCommands } from '../../support/commands'
import homePage from '../../pages/homePage'
import pagePage from '../../pages/pagePage';

registerCommands()

let user = Cypress.config('user')
let passw = Cypress.config('passw')
let postPrefix = "new-page"
let tagName= ""

before(() => {
    //Login in Application
    cy.loginAdmin(user,passw)
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
    cy.screenshot('Tag/'+ postPrefix +'/Logout')
  }); 