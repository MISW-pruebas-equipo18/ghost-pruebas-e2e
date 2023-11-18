import { registerCommands } from '../../support/commands'
import homePage from '../../pages/homePage'
import settingsPage from '../../pages/settingsPage'
import staffPage from '../../pages/staffPage'

registerCommands()

let user = Cypress.config('user')
let passw = Cypress.config('passw')
let newPassw = "newPassw"

before(() => {
    //Login in Application
    cy.loginAdmin(user,passw)
    cy.url().should('include', '/dashboard')
    cy.screenshot('SignIn/invalid-change-pass/Login')
});

describe ('Validate incorrect change of password', function(){
    //Declaramos las variables para guardar las contraseñas antgua y nueva
    let oldPassw = passw
    let newPassword = newPassw

    it('P1: Ingreso al menú settings', () => {
        homePage.goToSettings()
        cy.url().should('include', '/settings')
        cy.screenshot('SignIn/invalid-change-pass/P1_Settings')
    });

    it('P2: Ingreso al menú Staff', () => {
        settingsPage.goToStaff()
        cy.url().should('include', '/staff')
        cy.screenshot('SignIn/invalid-change-pass/P2_Staff')
    });

    it('P3: Ingreso al OWNER', () => {
        staffPage.goToOwner()
        cy.screenshot('SignIn/invalid-change-pass/P3_Owner')
    });

    it('P4: Diligenciamiento de información', () => {
        //Diligenciamos los campos y guardadmos
        staffPage.changePass(newPassword,oldPassw)
        cy.get('button').should('contain', 'Retry')
        cy.screenshot('SignIn/invalid-change-pass/P4_Diligenciamiento')
    });
    
    it('P5: Logout', () => {
        cy.logout()
        cy.url().should('include', '/signin')
        cy.screenshot('SignIn/invalid-change-pass/P5_Logout')
    });

    it('P6: Try Signin', () => {
        cy.loginAdmin(user,newPassword)
        cy.get('button').should('contain', 'Retry')
        cy.contains('Retry').click()
        cy.get('button').should('contain', 'Retry')
        cy.screenshot('SignIn/invalid-change-pass/P6_Try_Signin')
    }); 
    
    it('P7: Signin', () => {
        //sig in
        cy.loginAdmin(user,passw)
        cy.url().should('include', '/dashboard')
        cy.screenshot('SignIn/invalid-change-pass/P7_Signin')
    });
});

after(() => {
    cy.logout()
    cy.url().should('include', '/signin')
    cy.screenshot('SignIn/invalid-data/P6_LogOut')
  });  