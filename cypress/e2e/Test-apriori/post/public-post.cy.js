import {faker} from '@faker-js/faker';
import { registerCommands } from '../../../support/commands'

import homePage from '../../../pages/5.73.2/homePage'
import postPage from '../../../pages/5.73.2/postPage';

registerCommands()
let user = Cypress.config('userv2')
let passw = Cypress.config('passwv2')
let version = "v2"
let postPrefix = "ghost-5.73.2/public-post"
let screenShots = Cypress.config('screenShots')

const tests = require('../../../fixtures/post.json');

before(() => {
  //Login in Application
  cy.loginAdmin(user,passw,version)
  cy.url().should('include', '/dashboard')
  screenShots ? cy.screenshot('Post/'+ postPrefix +'/Login'): null
});

describe ('Creación de post', function(){

  tests.publicPost.forEach((test) => {
    it('Creación de post: ' + test.id, function(){
      homePage.gotoPosts()
      cy.url().should('include', '/posts')
      screenShots ? cy.screenshot('Post/'+postPrefix+'/P2_Posts'): null
  
      //publicación de post con datos vacios
      postPage.newPost()
      cy.url().should('include', '/editor/post')
      screenShots ? cy.screenshot('Post/'+postPrefix+'/P3_Editor'): null
  
      if((test.title == null || test.title == "") && (test.content == null || test.content == ""))
      {
        postPage.fillAndSaveNullPost()
      }
      else
      {
        postPage.fillPost(test.title,test.content)
        postPage.elements.publish().click()
      }
      postPage.goToPublishType()
      screenShots ? cy.screenshot('Post/'+postPrefix+'/P5_PublishOnly'): null
  
      
      postPage.publishOnly()
      screenShots ? cy.screenshot('Post/'+postPrefix+'/P6_FinalReview'): null
      
      
      postPage.goToContinuePublish()
      screenShots ? cy.screenshot('Post/'+postPrefix+'/P7_PublishNow'): null
  
      postPage.goConfirmPublish()
      postPage.elements.titleComplete().should('contain', "Boom. It’s out there.")
      postPage.elements.completeBrookmark().should('contain', test.title)
      screenShots ? cy.screenshot('Post/'+postPrefix+'/P8_Published'): null
  
      postPage.goBackEditor()
      postPage.goreturnPost()
      cy.url().should('include', '/posts')    
      screenShots ? cy.screenshot('Post/'+ postPrefix +'/P10_Posts'): null

      postPage.elements.postListItem().should('contain', test.title).and('contain', "Published")
      screenShots ? cy.screenshot('Post/'+ postPrefix +'/P11_PostVerification'): null
    });
  });

  });

  after(() => {
    cy.logout()
    cy.url().should('include', '/signin')
    screenShots ? cy.screenshot('Post/'+ postPrefix +'/Logout'): null
  });  