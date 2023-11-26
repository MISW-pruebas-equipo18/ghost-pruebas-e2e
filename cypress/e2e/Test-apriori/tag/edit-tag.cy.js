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
let screenShots = Cypress.config('screenShots')
const tests = require('../../../fixtures/tag.json');

before(() => {
    //Login in Application
    cy.loginAdmin(user,passw,version)
    cy.url().should('include', '/dashboard')
    screenShots ? cy.screenshot('Tag/'+ postPrefix +'/Login'): null
});

describe ('Edit tag', function(){   

    it('Create Tag', function(){
        homePage.goToTags()
        screenShots ? cy.screenshot('Tag/'+ postPrefix +'/P0_GoToTags') : null
        tagName= faker.lorem.word()
        tagPage.createTag(tagName, tagName, faker.lorem.sentence())
        tagPage.elements.viewActions().should('contain', "Saved")
        screenShots ? cy.screenshot('Tag/'+ postPrefix +'/P1_CreateTag'): null
    });

    it('Verify new Tag', function(){
        tagPage.returnToTags()
        tagPage.elements.tagItem().should('contain', tagName)
        screenShots ? cy.screenshot('Tag/'+ postPrefix +'/P2_VerifyTag'): null
    });

    tests.editTag.forEach((test) => {
        it('Edit Tag: ' + test.id, function(){
            tagPage.editTag(tagName, test.name, test.slug, test.description)

            cy.get('button').then(($viewActions) => {
                if($viewActions.text().includes("Retry"))
                {
                    tagPage.returnToTags()
                    tagPage.elements.btnLeave().click()
                }
                else
                {
                    tagName = test.name
                    tagPage.elements.viewActions().should('contain', "Saved")
                    screenShots ? cy.screenshot('Tag/'+ postPrefix +'/P3_EditTag'): null
                    tagPage.returnToTags()
                }

                tagPage.elements.tagItem().should('contain', test.name == null || test.name =="" ? "ErrorTag" : test.name)
                screenShots ? cy.screenshot('Tag/'+ postPrefix +'/P4_VerifyTag'): null
            })
        });
    });

});

after(() => {
    cy.logout()
    cy.url().should('include', '/signin')
    screenShots ? cy.screenshot('Tag/'+ postPrefix +'/Logout'): null
  }); 