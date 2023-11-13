import { registerCommands } from '../../support/commands'

registerCommands()

let user = Cypress.config('user')
let passw = Cypress.config('passw')
let newPassw = "newPassw"

describe ('Validate incorrect change of password', function(){
    //Declaramos las variables para guardar las contraseñas antgua y nueva
    let oldPassw = passw
    let newPassword = newPassw

    it('Try password change', () => {

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

        //Diligenciamos los campos y guardadmos
        cy.get('input[id=user-password-old]').type(newPassword)
        cy.get('input[id=user-password-new]').type(oldPassw)
        cy.get('input[id=user-new-password-verification]').type(oldPassw)
        cy.contains('Change Password').click()
        cy.get('button').should('contain', 'Retry')
        
        //Logout and try sig in
        //Deslogearse
        cy.get('div.gh-user-avatar.relative').click()
        cy.contains('Sign out').click()
        cy.url().should('include', '/signin')

        cy.get('input[name=identification]').clear()
        cy.get('input[name=password]').clear()
        cy.get('input[name=identification]').type(user)
        cy.get('input[name=password]').type(newPassword)
        cy.get('button.gh-btn-login').click()

        cy.get('button').should('contain', 'Retry')
        cy.contains('Retry').click()
        cy.get('button').should('contain', 'Retry')
    
        //sig in
        cy.login(user,passw)
        cy.url().should('include', '/dashboard')
    });
});