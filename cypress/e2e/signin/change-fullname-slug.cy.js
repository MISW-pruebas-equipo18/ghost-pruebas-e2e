import { registerCommands } from '../../support/commands'

registerCommands()

let user = Cypress.config('user')
let passw = Cypress.config('passw')

let FullName ="PRUEBAS AUTOMATIZADAS"
let Slug = "pruebas-automatizadas"
let oldSlug = ""

describe ('Change Full Name', function(){

    it('Go to new full name', () => {

        //Login in Application
        cy.login(user,passw)
        cy.url().should('include', '/dashboard')
        
        //Ingresamos al area de Staff a través del menú Settings del usuario
        cy.get('a[id=ember34]').click()
        cy.wait(2000)
        cy.url().should('include', '/settings')

        cy.contains('Staff').click()
        cy.wait(2000)
        cy.url().should('include', '/staff')

        //Accedemos al OWNER que se liste
        cy.get('span.user-list-item-figure').click()

        //Diligenciamos los campos y guardadmos
        let oldFullName = "";
        cy.get('input[id=user-name]')
        .invoke('val')
        .then(sometext => {
            oldFullName = sometext
            
            if(oldFullName == null || oldFullName == ""){
                console.log(oldFullName);
                oldFullName="Ghost Owner"
            }
    
            cy.get('input[id=user-name]').clear()
            cy.get('input[id=user-name]').type(FullName)
            cy.contains('Save').click()
            cy.contains('Staff').click()
            cy.url().should('include', '/staff')
            cy.get('h3').should('contain', FullName)
    
            cy.get('div.gh-user-avatar.relative').click()
            cy.get('h4').should('contain', FullName)
            cy.wait(2000)
    
            //Go to reset full name
            //Accedemos al OWNER que se liste
            cy.get('span.user-list-item-figure').click()
            cy.get('input[id=user-name]').clear()
            cy.get('input[id=user-name]').type(oldFullName)
            cy.contains('Save').click()
            cy.contains('Staff').click()
            cy.url().should('include', '/staff')
            cy.get('h3').should('contain', oldFullName)
    
            cy.get('div.gh-user-avatar.relative').click()
            cy.get('h4').should('contain', oldFullName)
        })
    }); 

});