import { registerCommands } from '../../support/commands'

registerCommands()

let user = Cypress.config('user')
let passw = Cypress.config('passw')
let newPassw = "newPassw"

before(() => {
    //Login in Application
    cy.login(user,passw)
    cy.url().should('include', '/dashboard')
    cy.screenshot('SignIn/invalid-change-pass/Login')
});

describe ('Validate incorrect change of password', function(){
    //Declaramos las variables para guardar las contraseñas antgua y nueva
    let oldPassw = passw
    let newPassword = newPassw

    it('P1: Ingreso al menú settings', () => {
        //Ingresamos al area de Staff a través del menú Settings del usuario
        cy.get('a[id=ember34]').click()
        cy.url().should('include', '/settings')
        cy.screenshot('SignIn/invalid-change-pass/P1_Settings')
        cy.wait(1000)
    });

    it('P2: Ingreso al menú Staff', () => {
        cy.contains('Staff').click()
        cy.wait(2000)
        cy.url().should('include', '/staff')
        cy.screenshot('SignIn/invalid-change-pass/P2_Staff')
    });

    it('P3: Ingreso al OWNER', () => {
        //Accedemos al OWNER que se liste
        cy.get('span.user-list-item-figure').click()
        cy.wait(1000)
        cy.screenshot('SignIn/invalid-change-pass/P3_Owner')
    });

    it('P4: Diligenciamiento de información', () => {
        //Diligenciamos los campos y guardadmos
        cy.get('input[id=user-password-old]').type(newPassword)
        cy.get('input[id=user-password-new]').type(oldPassw)
        cy.get('input[id=user-new-password-verification]').type(oldPassw)
        cy.contains('Change Password').click()
        cy.get('button').should('contain', 'Retry')
        cy.screenshot('SignIn/invalid-change-pass/P4_Diligenciamiento')
    });
    
    it('P5: Logout', () => {
        cy.logout()
        cy.url().should('include', '/signin')
        cy.screenshot('SignIn/invalid-change-pass/P5_Logout')
    });

    it('P6: Try Signin', () => {
        cy.get('input[name=identification]').clear()
        cy.get('input[name=password]').clear()
        cy.get('input[name=identification]').type(user)
        cy.get('input[name=password]').type(newPassword)
        cy.get('button.gh-btn-login').click()
        cy.get('button').should('contain', 'Retry')

        cy.contains('Retry').click()
        cy.get('button').should('contain', 'Retry')

        cy.screenshot('SignIn/invalid-change-pass/P6_Try_Signin')
    }); 
    
    it('P7: Signin', () => {
        //sig in
        cy.login(user,passw)
        cy.url().should('include', '/dashboard')
        cy.screenshot('SignIn/invalid-change-pass/P7_Signin')
    });
});

after(() => {
    cy.logout()
    cy.url().should('include', '/signin')
    cy.screenshot('SignIn/invalid-change-pass/Logout')
  });   