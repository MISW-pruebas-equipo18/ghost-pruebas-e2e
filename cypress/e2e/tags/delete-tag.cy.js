import {faker} from '@faker-js/faker';

import { registerCommands } from '../../support/commands'
import tagPage from '../../pages/tagPage'
import homePage from '../../pages/homePage'


registerCommands()

let user = Cypress.config('user')
let passw = Cypress.config('passw')
let postPrefix = "delete-tag"
let tagName= ""

before(() => {
    //Login in Application
    cy.loginAdmin(user,passw)
    cy.url().should('include', '/dashboard')
    cy.screenshot('Tag/'+ postPrefix +'/Login')
});

describe ('Delete Tag', function(){

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

    it('Delete Tag', function(){
        tagPage.deleteTag(tagName)
    });

    it('Verify No Exists Tag', function(){
        tagPage.elements.tagItem().should('not.contain', tagName)
        cy.screenshot('Tag/'+ postPrefix +'/P3_VerifyTag')
    });
    
});

after(() => {
    cy.logout()
    cy.url().should('include', '/signin')
    cy.screenshot('Tag/'+ postPrefix +'/Logout')
  }); 