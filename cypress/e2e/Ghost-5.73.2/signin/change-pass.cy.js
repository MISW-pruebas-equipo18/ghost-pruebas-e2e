import { registerCommands } from '../../../support/commands'
import homePage from '../../../pages/5.73.2/homePage'
import settingsPage from '../../../pages/5.73.2/settingsPage'
import staffPage from '../../../pages/5.73.2/staffPage'

registerCommands()

let user = Cypress.config('userv2')
let passw = Cypress.config('passwv2')
let newPassw = Cypress.config('newPasswv2')
let oldPassw = Cypress.config('passwv2')
let version = "v2"
let postPrefix = "ghost-5.73.2/change-pass"

beforeEach(() => {
    //Login in Application
    cy.loginAdmin(user,passw,version)
    cy.url().should('include', '/dashboard')
    cy.screenshot('SignIn/'+ postPrefix +'/Login')
});

describe ('Validate change of password', function(){
    it('P0: Change Password', function(){
        changePassw()
        cy.url().should('include', '/signin')
        cy.screenshot('SignIn/'+ postPrefix +'/P0_change_pass')
        passw = newPassw
        newPassw = oldPassw
    });
    
    it('P2: Reset Password', function(){
        changePassw(true)
        cy.url().should('include', '/signin')
        cy.screenshot('SignIn/'+ postPrefix +'/P2_reset_pass')
    });
});

function changePassw()
{    
    //Ingresamos al area de Staff a través del menú Settings del usuario
    homePage.goToSettings()
    cy.url().should('include', '/settings')
    cy.screenshot('SignIn/'+ postPrefix +'/P1_settings')

    settingsPage.goToStaff()
    cy.url().should('include', '/staff')
    cy.screenshot('SignIn/'+ postPrefix +'/P2_staff')
    
    //Accedemos al OWNER que se liste
    staffPage.goToOwner()
    cy.screenshot('SignIn/'+ postPrefix +'/P3_owner')

    //Diligenciamos los campos y guardamos
    staffPage.changePass(passw,newPassw)
    //staffPage.closeNotification()
    staffPage.elements.btnCancel().click()
    staffPage.goToHomePage()
    cy.wait(1000)
    cy.url().should('include', '/dashboard')
    cy.wait(1000)

    //Deslogearse
    cy.logout()
    cy.url().should('include', '/signin')
    cy.screenshot('SignIn/'+ postPrefix +'/Logout')
}  