import {faker} from '@faker-js/faker';

import { registerCommands } from '../../support/commands'
import tagPage from '../../pages/tagPage'
import homePage from '../../pages/homePage'
import pagePage from '../../pages/pagePage';

registerCommands()

let user = Cypress.config('user')
let passw = Cypress.config('passw')
let postPrefix = "assign-tag"
let tagName= ""
let pageName= ""

before(() => {
    //Login in Application
    cy.loginAdmin(user,passw)
    cy.url().should('include', '/dashboard')
    cy.screenshot('Tag/'+ postPrefix +'/Login')
});

describe ('Assign Tag to Page', function(){

    it('Create Tag', function(){
        homePage.goToTags()
        cy.screenshot('Tag/'+ postPrefix +'/P0_GoToTags')
        tagName= faker.lorem.word()
        tagPage.createTag(tagName, tagName, faker.lorem.sentence())
        tagPage.elements.viewActions().should('contain', "Saved")
        cy.screenshot('Tag/'+ postPrefix +'/P1_CreateTag')
    });

    it('Verify Tag', function(){
        tagPage.returnToTags()
        tagPage.elements.tagItem().should('contain', tagName)
        cy.screenshot('Tag/'+ postPrefix +'/P2_VerifyTag')
    });

    it('Asign Tag', function(){
        homePage.goToPages()
        pageName= faker.lorem.word()
        pagePage.createPage(pageName, faker.lorem.sentence())
        cy.screenshot('Tag/'+ postPrefix +'/P3_CreatePage')

        pagePage.goToPageEditor()
        pagePage.returnToPages()
        pagePage.addTag(tagName,pageName)
        cy.screenshot('Tag/'+ postPrefix +'/P4_AssignTag')

        pagePage.returnToPages()
    });
    
});

after(() => {
    cy.logout()
    cy.url().should('include', '/signin')
    cy.screenshot('Tag/'+ postPrefix +'/Logout')
  }); 