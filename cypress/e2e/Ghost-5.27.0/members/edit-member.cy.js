import { registerCommands } from '../../support/commands'

registerCommands()

let user = Cypress.config('user')
let passw = Cypress.config('passw')
let version = "v1"

before(( ) => {
    cy.loginAdmin(user,passw,version)
    cy.url().should('include', '/dashboard')
})  

// describe ('Edit members', function(){  

//     const user = {
//         currentEmail: 'josebocanegra@uniandes.edu.co',
//         newEmail: 'jbnegra@gmail.com', 
//     };

//     it('edit current member', function(){
      
//         cy.on('uncaught:exception', (err, runnable) => {
//             return false
//         })
//         cy.visit(Cypress.env('url_members'))
//         cy.contains(user.currentEmail).click()
//         cy.wait(1000)
//         cy.getByTestInput('member-email').clear()
//         cy.getByTestInput('member-email').type(user.newEmail)
//         cy.contains('Save').click()
//     });

//     it('Verify edit member', function(){
//         cy.visit(Cypress.env('url_members'))
//         cy.contains(user.newEmail).should('be.visible')
//     });
// });

after(() => {
    cy.logout()
    cy.url().should('include', '/signin')
    cy.screenshot('SignIn/change-fullname/Logout')
  });  