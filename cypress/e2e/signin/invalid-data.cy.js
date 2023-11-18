import { registerCommands } from '../../support/commands'

registerCommands()

let user = Cypress.config('user')
let passw = Cypress.config('passw')

describe ('Validate Sig in Restrictions', function(){
    
    it('P1: Ingreso de credenciales de un usuario inexistente', function(){
        cy.loginAdmin("user",passw)
        cy.wait(100)
        cy.get('button').should('contain', 'Retry')
        cy.screenshot('SignIn/invalid-data/P1_Usuario_Inexistente')
    });

    it('P2: Intento de ingreso con campo usuario vacio', function(){
        cy.loginAdmin('',passw)
        cy.get('button').should('contain', 'Retry') 
        cy.screenshot('SignIn/invalid-data/P2_Usuario_Vacio')
    });

    it('P3: Intento de ingreso con contraseña vacia', function(){
        cy.loginAdmin(user,'')
        cy.get('button').should('contain', 'Retry')
        cy.screenshot('SignIn/invalid-data/P3_Contrasenia_Vacia')
    });
    
    it('P4: Intento de ingreso con credenciales largas', function(){
        cy.loginAdmin("abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz","abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz")
        cy.get('button').should('contain', 'Retry')
        cy.screenshot('SignIn/invalid-data/P4_Credenciales_Largas')
    });
    
    it('P5: Ingreso con credenciales válidas', function(){
        cy.loginAdmin(user,passw)
        cy.url().should('include', '/dashboard')
        cy.screenshot('SignIn/invalid-data/P5_Credenciales_Validas')
    });
      
  });

  after(() => {
    cy.logout()
    cy.url().should('include', '/signin')
    cy.screenshot('SignIn/invalid-data/P6_LogOut')
  });   