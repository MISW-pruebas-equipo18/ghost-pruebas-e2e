import { registerCommands } from '../../support/commands'

registerCommands()

let user = Cypress.config('user')
let passw = Cypress.config('passw')

describe ('Validate Sig in Restrictions', function(){
    
    it('P1: Ingreso de credenciales de un usuario inexistente', function(){
        cy.visit('http://localhost:2368/ghost/')
        cy.wait(100)
        cy.get('input[name=identification]').type("user")
        cy.get('input[name=password]').type("passw")
        cy.contains('Sign in →').click()
        cy.wait(100)
        cy.get('button').should('contain', 'Retry')

        cy.screenshot('SignIn/invalid-data/P1_Usuario_Inexistente')
    });

    it('P2: Intento de ingreso con campo usuario vacio', function(){
        //Intento de ingreso con campo usuario vacio
        cy.get('input[name=identification]').clear()
        cy.contains('Retry').click()
        cy.get('button').should('contain', 'Retry')
        
        cy.screenshot('SignIn/invalid-data/P2_Usuario_Vacio')
    });

    it('P3: Intento de ingreso con contraseña vacia', function(){
        //Intento de ingreso con contraseña vacia
        cy.get('input[name=password]').clear()
        cy.contains('Retry').click()
        cy.get('button').should('contain', 'Retry')

        cy.screenshot('SignIn/invalid-data/P3_Contrasenia_Vacia')
    });
    
    it('P4: Intento de ingreso con credenciales largas', function(){
        //Credenciales muy largas
        cy.get('input[name=identification]').type("abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz")
        cy.get('input[name=password]').type("abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz")
        cy.contains('Retry').click()
        cy.get('button').should('contain', 'Retry')
        
        cy.screenshot('SignIn/invalid-data/P4_Credenciales_Largas')
    });
    
    it('P5: Ingreso con credenciales válidas', function(){
        //Ingreso con credenciales válidas
        cy.get('input[name=identification]').clear()
        cy.get('input[name=password]').clear()
        cy.get('input[name=identification]').type(user)
        cy.get('input[name=password]').type(passw)
        cy.contains('Retry').click()
        cy.url().should('include', '/dashboard')
        
        cy.screenshot('SignIn/invalid-data/P5_Credenciales_Validas')
    });
      
  });

  after(() => {
    cy.logout()
    cy.screenshot('SignIn/invalid-data/P6_LogOut')
  });   