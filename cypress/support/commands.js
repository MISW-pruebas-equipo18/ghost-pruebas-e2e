import loginPage from '../pages/loginPage'
import homePage from '../pages/homePage'
import postPage, { goConfirmPublish } from '../pages/postPage'

const compareSnapshotCommand = require('cypress-visual-regression-resemble-js/dist/command');

compareSnapshotCommand();

let urlGhostAdmin = Cypress.config('baseUrl')
export function registerCommands(){

  Cypress.Commands.add('loginAdmin', (user,passw) =>
  { 
      cy.visit(urlGhostAdmin + 'ghost/')
      cy.wait(3000)
      loginPage.login(user,passw)
  });

  Cypress.Commands.add('logout', () =>
  {
      homePage.logout()
  });

  Cypress.Commands.add('createEditPost', (user,passw,postTitle,postPrefix) =>
  { 
    cy.loginAdmin(user,passw)
    cy.screenshot('Post/'+postPrefix+'/P1_Login')

    homePage.gotoPosts()
    cy.url().should('include', '/posts')
    cy.screenshot('Post/'+postPrefix+'/P2_Posts')

    //publicación de post con datos vacios
    postPage.newPost()
    cy.url().should('include', '/editor/post')
    cy.screenshot('Post/'+postPrefix+'/P3_Editor')

    postPage.fillAndSaveNullPost()
    cy.wait(1000)
    cy.screenshot('Post/'+postPrefix+'/P4_Publish')

    postPage.goToPublishType()
    cy.screenshot('Post/'+postPrefix+'/P5_PublishOnly')

    postPage.publishOnly()
    cy.screenshot('Post/'+postPrefix+'/P6_FinalReview')
    
    postPage.goToContinuePublish()
    cy.screenshot('Post/'+postPrefix+'/P7_PublishNow')

    postPage.goConfirmPublish()
    postPage.elements.titleComplete().should('contain', "Boom. It’s out there.")

    postPage.elements.completeBrookmark().should('contain', "(Untitled)")
    cy.screenshot('Post/'+postPrefix+'/P8_PublishedNull')

    postPage.goBackEditor()

    postPage.updatePost(postTitle,"El siguiente texto corresponde al cuerpo del post de prueba")
    
    //cy.get('span.gh-notification-title').should('contain', "Updated")
    postPage.elements.notificationPublished().should('contain', "Updated") 
    cy.screenshot('Post/'+postPrefix+'/P9_Update')
    postPage.clickButtonClose()
    postPage.goreturnPost()
  });

  Cypress.Commands.add('getByTestId', (testId) => {
    const log = Cypress.log({ name: 'getByTestId', message: testId })
    const selector = `[data-testId="${testId}"]`
    cy.get(selector)
  })

  Cypress.Commands.add('getByTestInput', (testInput) => {
    const log = Cypress.log({ name: 'getByTestInput', message: testInput })
    const selector = `[data-test-input="${testInput}"]`
    cy.get(selector)
  })  
}