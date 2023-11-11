let user = Cypress.config('user')
let passw = Cypress.config('passw')

describe ('Validate Sig in Restrictions', function(){
    it('Ingreso de credenciales no validos', function(){
        cy.visit('http://localhost:2368/ghost/')

        //Ingreso de credenciales de un usuario inexistente
        cy.get('input[name=identification]').type("user")
        cy.get('input[name=password]').type("passw")
        cy.contains('Sign in →').click()
        cy.wait(100)
        cy.get('button').should('contain', 'Retry')

        //Intento de ingreso con campo usuario vacio
        cy.get('input[name=identification]').clear()
        cy.contains('Retry').click()
        cy.get('button').should('contain', 'Retry')

        //Intento de ingreso con contraseña vacia
        cy.get('input[name=password]').clear()
        cy.contains('Retry').click()
        cy.get('button').should('contain', 'Retry')

        //Credenciales muy largas
        cy.get('input[name=identification]').type("abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz")
        cy.get('input[name=password]').type("abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz")
        cy.contains('Retry').click()
        cy.get('button').should('contain', 'Retry')

        //Ingreso con credenciales válidas
        cy.get('input[name=identification]').clear()
        cy.get('input[name=password]').clear()
        cy.get('input[name=identification]').type(user)
        cy.get('input[name=password]').type(passw)
        cy.contains('Retry').click()
        cy.url().should('include', '/dashboard')
      });
  });