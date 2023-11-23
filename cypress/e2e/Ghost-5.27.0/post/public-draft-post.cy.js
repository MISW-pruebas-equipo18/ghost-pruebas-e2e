import {faker} from '@faker-js/faker';
import postPage from '../../../pages/5.27.0/postPage'
import homePage from '../../../pages/5.27.0/homePage'
import { registerCommands } from '../../../support/commands'

registerCommands()
let user = Cypress.config('user')
let passw = Cypress.config('passw')
let postTitle = faker.lorem.words()
let version = "v1"
let postPrefix = "ghost-5.27.0/public-draft-post"

before(() => {
    //Login in Application
    cy.loginAdmin(user,passw,version)
    cy.url().should('include', '/dashboard')
    cy.screenshot('Post/'+postPrefix+'/Login')
});

describe ('Crear borrador de post y luego verificar su publicación', function(){
    
    it('Creación draft de post', function(){
        homePage.gotoPosts()
        cy.url().should('include', '/posts')
        cy.screenshot('Post/'+postPrefix+'/P2_Posts')

        //publicación de post con datos vacios
        postPage.newPost()
        cy.url().should('include', '/editor/post')
        cy.screenshot('Post/'+postPrefix+'/P3_Editor')

        postPage.fillPost(postTitle,"El siguiente texto corresponde al cuerpo del post de prueba")
        cy.screenshot('Post/'+postPrefix+'/P4_Draft')

        postPage.goreturnPost()
        cy.url().should('include', '/posts')
        cy.screenshot('Post/'+postPrefix+'/P5_Posts')

        postPage.elements.postListItem().should('contain', postTitle).and('contain', "Draft")
    });

    it('publish post', function(){
        postPage.openDraftPost(postTitle)
        postTitle = postTitle + " - Published"
        postPage.updateAndPublishPost(postTitle,"El siguiente texto corresponde al cuerpo del post de prueba para publicación")

        postPage.goToPublishType()
        cy.screenshot('Post/'+postPrefix+'/P6_PublishOnly')

        postPage.publishOnly()
        cy.screenshot('Post/'+postPrefix+'/P7_FinalReview')
        
        postPage.goToContinuePublish()
        cy.screenshot('Post/'+postPrefix+'/P8_PublishNow')

        postPage.goConfirmPublish()
        postPage.elements.titleComplete().should('contain', "Boom. It’s out there.")

        postPage.goreturnEditor()
        postPage.goreturnPost()
        postPage.elements.postListItem().should('contain', postTitle).and('contain', "Published")
        
    });
  });

  after(() => {
    cy.logout()
    cy.url().should('include', '/signin')
    cy.screenshot('Post/'+postPrefix+'/Logout')
  });  