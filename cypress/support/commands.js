import loginPage from '../pages/5.73.2/loginPage'
import homePage from '../pages/5.73.2/homePage'
import postPage from '../pages/5.73.2/postPage'
import homePagev2 from '../pages/5.73.2/homePage'
import postPagev2 from '../pages/5.73.2/postPage'

let urlGhostAdmin = Cypress.config('baseUrl')
let urlGhostAdminv2 = Cypress.config('baseUrlv2')
export function registerCommands(){

  Cypress.Commands.add('loginAdmin', (user,passw,version) =>
  { 
    if (version == "v2"){
      cy.visit(urlGhostAdminv2 + 'ghost/')
    }
    else{
      cy.visit(urlGhostAdmin + 'ghost/')
    }
    
    cy.wait(2000)
    loginPage.login(user,passw)
    cy.wait(2000)
  });

  Cypress.Commands.add('logout', () =>
  {
      homePage.logout()
  });

  Cypress.Commands.add('createEditPost', (user,passw,postTitle,postPrefix,version) =>
  { 
    cy.loginAdmin(user,passw,version)
    cy.screenshot('Post/'+postPrefix+'/P1_Login')
    console.log(version)
    if (version == "v2")
    {
      homePagev2.gotoPosts()
    }
    else
    {
      homePage.gotoPosts()
    }
    cy.url().should('include', '/posts')
    cy.screenshot('Post/'+postPrefix+'/P2_Posts')

    
    //publicación de post con datos vacios
    if (version == "v2")
      {postPagev2.newPost()}
    else
      {postPage.newPost()}
    
    cy.url().should('include', '/editor/post')
    cy.screenshot('Post/'+postPrefix+'/P3_Editor')

    if (version == "v2")
      {postPagev2.fillAndSaveNullPost()}
    else
      {postPage.fillAndSaveNullPost()}

    cy.wait(1000)
    cy.screenshot('Post/'+postPrefix+'/P4_Publish')

    if (version == "v2")
    {
      postPagev2.goToPublishType()
    }
    else
    {
      postPage.goToPublishType()
    }

    cy.screenshot('Post/'+postPrefix+'/P5_PublishOnly')

    if (version == "v2")
      {postPagev2.publishOnly()}
    else
      {postPage.publishOnly()}

    cy.screenshot('Post/'+postPrefix+'/P6_FinalReview')
    
    if (version == "v2")
      {postPagev2.goToContinuePublish()}
    else
      {postPage.goToContinuePublish()}

    cy.screenshot('Post/'+postPrefix+'/P7_PublishNow')

    if (version == "v2")
    {
      postPagev2.goConfirmPublish()
      postPagev2.elements.titleComplete().should('contain', "Boom. It’s out there.")
      postPagev2.elements.completeBrookmark().should('contain', "(Untitled)")
    }
    else
    {
      postPage.goConfirmPublish()
      postPage.elements.titleComplete().should('contain', "Boom. It’s out there.")
      postPage.elements.completeBrookmark().should('contain', "(Untitled)")
    }
    cy.screenshot('Post/'+postPrefix+'/P8_PublishedNull')

    if (version == "v2")
    {
      postPagev2.goBackEditor()
      postPagev2.updatePost(postTitle,"El siguiente texto corresponde al cuerpo del post de prueba")
      //postPagev2.elements.notificationPublished().should('contain', "Updated") 
    }
    else
    {
      postPage.goBackEditor()
      postPage.updatePost(postTitle,"El siguiente texto corresponde al cuerpo del post de prueba")
      postPage.elements.notificationPublished().should('contain', "Updated") 
    }
    cy.screenshot('Post/'+postPrefix+'/P9_Update')
    
    if (version == "v2")
    {
      postPagev2.clickButtonClose()
      postPagev2.goreturnPost()
    }
    else
    {
      postPage.clickButtonClose()
      postPage.goreturnPost()
    }
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