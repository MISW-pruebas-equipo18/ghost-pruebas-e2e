import {faker} from '@faker-js/faker';
import postPage from '../../../pages/5.73.2/postPage'
import homePage from '../../../pages/5.73.2/homePage'
import { registerCommands } from '../../../support/commands'

registerCommands()
let user = Cypress.config('userv2')
let passw = Cypress.config('passwv2')
let postTitle = faker.lorem.words()
let version = "v2"
let postPrefix = "ghost-5.73.2/public-and-unpublish-post"
before(() => {
    //Login in Application
    cy.loginAdmin(user,passw,version)
    cy.url().should('include', '/dashboard')
    cy.screenshot('Post/'+postPrefix+'/Login')
});


describe ('Crear y publicar post, luego despublicarlo', function(){
    it('publish post', function(){
        homePage.gotoPosts()
        postPage.newPost()
        postPage.createAndPublishPost(postTitle,"El siguiente texto corresponde al cuerpo del post de prueba del post para publicación") 

        postPage.goreturnEditor()
        postPage.goreturnPost()
        postPage.elements.postListItem().should('contain', postTitle).and('contain', "Published")
        
    });

    it('unpublish post', function(){
        postPage.openDraftPost(postTitle)
        postPage.goToUnpublish()
        cy.screenshot('Post/'+postPrefix+'/P9_UnpublishPost')

        postPage.confirmunPublish()
        postPage.elements.notificationPublished().should('contain', "Post successfully reverted to a draft") 

        postPage.goreturnPost()
        postPage.elements.postListItem().should('contain', postTitle).and('contain', "Draft")
        postPage.clickButtonClose()
    });
  });

  after(() => {
    cy.logout()
    cy.url().should('include', '/signin')
    cy.screenshot('Post/'+postPrefix+'/Logout')
  });  