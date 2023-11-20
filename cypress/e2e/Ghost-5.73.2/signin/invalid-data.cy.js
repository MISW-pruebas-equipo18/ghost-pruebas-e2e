import { registerCommands } from '../../../support/commands'

registerCommands()

let user = Cypress.config('userv2')
let passw = Cypress.config('passwv2')
let version = "v2"
let postPrefix = "ghost-5.73.2/invalid-data"

describe ('Validate Sig in Restrictions', function(){
    
    it('P1: Ingreso de credenciales de un usuario inexistente', function(){
        cy.loginAdmin("user",passw,version)
        cy.wait(100)
        cy.get('button').should('contain', 'Retry')
        cy.screenshot('SignIn/'+ postPrefix +'/P1_Usuario_Inexistente')
    });

    it('P2: Intento de ingreso con campo usuario vacio', function(){
        cy.loginAdmin('',passw,version)
        cy.get('button').should('contain', 'Retry') 
        cy.screenshot('SignIn/'+ postPrefix +'/P2_Usuario_Vacio')
    });

    it('P3: Intento de ingreso con contraseña vacia', function(){
        cy.loginAdmin(user,'',version)
        cy.get('button').should('contain', 'Retry')
        cy.screenshot('SignIn/'+ postPrefix +'/P3_Contrasenia_Vacia')
    });
    
    it('P4: Intento de ingreso con credenciales largas', function(){
        cy.loginAdmin("abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz","abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz",version)
        cy.get('button').should('contain', 'Retry')
        cy.screenshot('SignIn/'+ postPrefix +'/P4_Credenciales_Largas')
    });
    
    it('P5: Ingreso con credenciales válidas', function(){
        cy.loginAdmin(user,passw,version)
        cy.url().should('include', '/dashboard')
        cy.screenshot('SignIn/'+ postPrefix +'/P5_Credenciales_Validas')
    });
      
  });

  after(() => {
    cy.logout()
    cy.url().should('include', '/signin')
    cy.screenshot('SignIn/'+ postPrefix +'/P6_LogOut')
  });   