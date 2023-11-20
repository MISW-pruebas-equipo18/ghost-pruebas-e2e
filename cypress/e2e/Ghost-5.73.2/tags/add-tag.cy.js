import {faker} from '@faker-js/faker';
import { registerCommands } from '../../../support/commands'

registerCommands()
import tagPage from '../../../pages/5.73.2/tagPage'
import homePage from '../../../pages/5.73.2/homePage'

let user = Cypress.config('userv2')
let passw = Cypress.config('passwv2')
let postPrefix = "ghost-5.73.2/add-tag"
let tagName= ""
let version = "v2"
before(() => {
    //Login in Application
    cy.loginAdmin(user,passw,version)
    cy.url().should('include', '/dashboard')
    cy.screenshot('Tag/'+ postPrefix +'/Login')
});

describe ('Add tag', function(){   

    it('Create Tag', function(){
        homePage.goToTags()
        cy.screenshot('Tag/'+ postPrefix +'/P0_GoToTags')
        tagName= faker.lorem.word()
        tagPage.createTag(tagName, tagName, faker.lorem.sentence())
        tagPage.elements.viewActions().should('contain', "Saved")
        cy.screenshot('Tag/'+ postPrefix +'/P1_CreateTag')
    });

    it('Verify new Tag', function(){
        tagPage.returnToTags()
        tagPage.elements.tagItem().should('contain', tagName)
        cy.screenshot('Tag/'+ postPrefix +'/P2_VerifyTag')
    });
});

after(() => {
    cy.logout()
    cy.url().should('include', '/signin')
    cy.screenshot('Tag/'+ postPrefix +'/Logout')
  }); 