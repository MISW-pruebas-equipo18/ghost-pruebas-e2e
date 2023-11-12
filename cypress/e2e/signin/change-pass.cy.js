import { registerCommands } from '../../support/commands'

registerCommands()

let user = Cypress.config('user')
let passw = Cypress.config('passw')
let newPassw = Cypress.config('newPassw')
let reset = false

describe ('Validate change of password', function(){
    it('Change Password', function(){
        changePassw()
        cy.url().should('include', '/signin')
    });

    it('Reset Password', function(){
        reset = true
        changePassw()
        cy.url().should('include', '/signin')
    });
});

function changePassw()
{
    //Declaramos las variables para guardar las contraseñas antgua y nueva
    let oldPassw = passw
    let newPassword = newPassw
    
    //Login in Application
    cy.login(user,oldPassw)
    cy.url().should('include', '/dashboard')

    //Ingresamos al area de Staff a través del menú Settings del usuario
    cy.get('a[id=ember34]').click()
    cy.url().should('include', '/settings')

    cy.contains('Staff').click()
    cy.wait(2000)
    cy.url().should('include', '/staff')

    //Accedemos al OWNER que se liste
    cy.get('span.user-list-item-figure').click()

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
    cy.url().should('include', '/staff')

    //Deslogearse
    cy.get('div.gh-user-avatar.relative').click()
    cy.contains('Sign out').click()
}