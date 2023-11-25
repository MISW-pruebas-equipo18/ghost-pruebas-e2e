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
let screenShots = Cypress.config('screenShots')


const tests = require('../../../fixtures/page.json');
before(() => {
    //Login in Application
    cy.loginAdmin(user,passw,version)
    cy.url().should('include', '/dashboard')
    screenShots ? cy.screenshot('Page/'+ postPrefix +'/Login') : null
});

describe ('Create new Page', function(){

    tests.publicPage.forEach((test) => {
        it('Create Page', function(){
            
            cy.url().then(url => {
                if(!url.includes('pages'))
                {
                    homePage.goToPages()
                }    
            })

            if((test.title == null || test.title == "") && (test.content == null || test.content == ""))
            {
                pagePage.createnullPage()
            }
            else
            {
                pagePage.createPage(test.title, test.content)
            }
            screenShots ? cy.screenshot('Page/'+ postPrefix +'/P1_CreatePage') : null
        
            //Verify Page'
            pagePage.goToPageEditor()
            pagePage.returnToPages()
            pagePage.elements.pageItem().should('contain', test.title)
            screenShots ? cy.screenshot('Page/'+ postPrefix +'/P2_VerifyPage') : null
        });
    });
});

after(() => {
    cy.logout()
    cy.url().should('include', '/signin')
    screenShots ? cy.screenshot('Page/'+ postPrefix +'/Logout') : null
  }); 