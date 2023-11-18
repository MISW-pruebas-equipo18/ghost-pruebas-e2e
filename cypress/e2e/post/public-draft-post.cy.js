import postPage from '../../pages/postPage'
import homePage from '../../pages/homePage'
import { registerCommands } from '../../support/commands'

registerCommands()
let user = Cypress.config('user')
let passw = Cypress.config('passw')
let postTitle = "Este es borrador de post para prueba"

before(() => {
    //Login in Application
    cy.loginAdmin(user,passw)
    cy.url().should('include', '/dashboard')
    cy.screenshot('SignIn/public-draft-post/Login')
});

let postPrefix = "public-draft-post"
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
    cy.screenshot('SignIn/change-fullname/Logout')
  });  