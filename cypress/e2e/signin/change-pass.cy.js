import { registerCommands } from '../../support/commands'
import homePage from '../../pages/homePage'
import settingsPage from '../../pages/settingsPage'
import staffPage from '../../pages/staffPage'

registerCommands()

let user = Cypress.config('user')
let passw = Cypress.config('passw')
let newPassw = Cypress.config('newPassw')
let oldPassw = Cypress.config('passw')

beforeEach(() => {
    //Login in Application
    cy.loginAdmin(user,passw)
    cy.url().should('include', '/dashboard')
    cy.screenshot('SignIn/change-pass/Login')
});

describe ('Validate change of password', function(){
    it('P0: Change Password', function(){
        changePassw()
        cy.url().should('include', '/signin')
        cy.screenshot('SignIn/change-pass/P0_change_pass')
        passw = newPassw
        newPassw = oldPassw
    });
    
    it('P2: Reset Password', function(){
        changePassw(true)
        cy.url().should('include', '/signin')
        cy.screenshot('SignIn/change-pass/P2_reset_pass')
    });
});

function changePassw()
{    
    //Ingresamos al area de Staff a través del menú Settings del usuario
    homePage.goToSettings()
    cy.url().should('include', '/settings')
    cy.screenshot('SignIn/change-pass/P1_settings')

    settingsPage.goToStaff()
    cy.url().should('include', '/staff')
    cy.screenshot('SignIn/change-pass/P2_staff')
    
    //Accedemos al OWNER que se liste
    staffPage.goToOwner()
    cy.screenshot('SignIn/change-pass/P3_owner')

    //Diligenciamos los campos y guardamos
    staffPage.changePass(passw,newPassw)
    cy.wait(1000)
    cy.url().should('include', '/staff')
    cy.wait(1000)

    //Deslogearse
    cy.logout()
    cy.url().should('include', '/signin')
    cy.screenshot('SignIn/change-pass/Logout')
}  