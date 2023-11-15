import { registerCommands } from '../../support/commands'

registerCommands()

let user = Cypress.config('user')
let passw = Cypress.config('passw')
let newPassw = Cypress.config('newPassw')
let reset = false

beforeEach(() => {
    //Login in Application
    cy.login(user,passw)
    cy.url().should('include', '/dashboard')
    cy.screenshot('SignIn/change-pass/Login')
});

describe ('Validate change of password', function(){
    it('P0: Change Password', function(){
        changePassw()
        cy.url().should('include', '/signin')
        cy.screenshot('SignIn/change-pass/P0_change_pass')
    });
    
    it('P2: Reset Password', function(){
        reset = true
        changePassw()
        cy.url().should('include', '/signin')
        cy.screenshot('SignIn/change-pass/P2_reset_pass')
    });
});

function changePassw()
{
    //Declaramos las variables para guardar las contraseñas antgua y nueva
    let oldPassw = passw
    let newPassword = newPassw
    
    //Ingresamos al area de Staff a través del menú Settings del usuario
    cy.get('a[id=ember34]').click()
    cy.url().should('include', '/settings')
    cy.wait(1000)
    cy.screenshot('SignIn/change-pass/P1_settings')

    cy.contains('Staff').click()
    cy.wait(2000)
    cy.url().should('include', '/staff')
    cy.screenshot('SignIn/change-pass/P2_staff')
    
    //Accedemos al OWNER que se liste
    cy.get('span.user-list-item-figure').click()
    cy.wait(1000)
    cy.screenshot('SignIn/change-pass/P3_owner')

    //Luego de cambiar la contraseña la volvemos a dejar como estaba al inicio
    if(reset)
    {
        oldPassw = newPassw
        newPassword = passw
    }

    //Diligenciamos los campos y guardadmos
    cy.get('input[id=user-password-old]').type(oldPassw)
    cy.get('input[id=user-password-new]').type(newPassword)
    cy.get('input[id=user-new-password-verification]').type(newPassword)
    cy.contains('Change Password').click()
    cy.wait(1000)
    cy.url().should('include', '/staff')
    cy.wait(1000)
    
    //Deslogearse
    cy.logout()
    cy.screenshot('SignIn/change-pass/Logout')
}

// after(() => {
//     cy.logout()
//     cy.screenshot('SignIn/change-pass/Logout')
//   });   