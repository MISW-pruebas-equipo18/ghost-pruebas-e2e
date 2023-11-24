import { registerCommands } from '../../../support/commands'
import homePage from '../../../pages/5.73.2/homePage'
import settingsPage from '../../../pages/5.73.2/settingsPage'
import staffPage from '../../../pages/5.73.2/staffPage'

registerCommands()

let user = Cypress.config('userv2')
let passw = Cypress.config('passwv2')
let newPassw = "newPassw"
let version = "v2"
let postPrefix = "ghost-5.73.2/invalid-change-pass"
let screenShots = Cypress.config('screenShots')
const tests = require('../../../fixtures/login.json')

before(() => {
    //Login in Application
    cy.loginAdmin(user,passw,version)
    cy.url().should('include', '/dashboard')
    screenShots ? cy.screenshot('SignIn/'+ postPrefix +'/Login') : null
});

describe ('Validate incorrect change of password', function(){
    //Declaramos las variables para guardar las contraseñas antgua y nueva
    let oldPassw = passw
    let newPassword = newPassw

    tests.invalidPassword.forEach((test) => {

        it('Cambio de contraseña', () => {
            homePage.goToSettings()
            cy.url().should('include', '/settings')
            screenShots ? cy.screenshot('SignIn/'+ postPrefix +'/P1_Settings'): null
        });

    });

    

    it('P2: Ingreso al menú Staff', () => {
        settingsPage.goToStaff()
        cy.url().should('include', '/staff')
        screenShots ? cy.screenshot('SignIn/'+ postPrefix +'/P2_Staff'): null
    });

    it('P3: Ingreso al OWNER', () => {
        staffPage.goToOwner()
        screenShots ? cy.screenshot('SignIn/'+ postPrefix +'/P3_Owner'): null
    });

    it('P4: Diligenciamiento de información', () => {
        //Diligenciamos los campos y guardadmos
        staffPage.changePass(newPassword,oldPassw)
        cy.get('div.flex.items-start.gap-3').should('contain', 'Your password is incorrect.')
        screenShots ? cy.screenshot('SignIn/'+ postPrefix +'/P4_Diligenciamiento'): null
        staffPage.elements.btnCancel().click()
        staffPage.goToHomePage()
    });
    
    it('P5: Logout', () => {
        cy.logout()
        cy.url().should('include', '/signin')
        screenShots ? cy.screenshot('SignIn/'+ postPrefix +'/P5_Logout'): null
    });

    it('P6: Try Signin', () => {
        cy.loginAdmin(user,newPassword,version)
        cy.get('button').should('contain', 'Retry')
        cy.contains('Retry').click()
        cy.get('button').should('contain', 'Retry')
        screenShots ? cy.screenshot('SignIn/'+ postPrefix +'/P6_Try_Signin'): null
    }); 
    
    it('P7: Signin', () => {
        //sig in
        cy.loginAdmin(user,passw,version)
        cy.url().should('include', '/dashboard')
        screenShots ? cy.screenshot('SignIn/'+ postPrefix +'/P7_Signin'): null
    });
});

after(() => {
    cy.logout()
    cy.url().should('include', '/signin')
    screenShots ? cy.screenshot('SignIn/'+ postPrefix +'/P6_LogOut'): null
  });  