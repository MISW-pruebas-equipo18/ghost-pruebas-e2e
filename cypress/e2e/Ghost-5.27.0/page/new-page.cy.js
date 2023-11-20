import {faker} from '@faker-js/faker';

import { registerCommands } from '../../../support/commands'
import homePage from '../../../pages/5.27.0/homePage'
import pagePage from '../../../pages/5.27.0/pagePage';

registerCommands()

let user = Cypress.config('user')
let passw = Cypress.config('passw')
let postPrefix = "ghost-5.27.0/new-page"
let tagName= ""
let version = "v1"
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