import { registerCommands } from '../../support/commands'

registerCommands()

let user = Cypress.config('user')
let passw = Cypress.config('passw')

let FullName ="PRUEBAS AUTOMATIZADAS"
let Slug = "pruebas-automatizadas"
let oldSlug = ""

before(() => {
    //Login in Application
    cy.login(user,passw)
    cy.url().should('include', '/dashboard')
    cy.screenshot('SignIn/invalid-change-pass/Login')
});

describe ('Change Full Name', function(){

    it('P1: Ingreso al menú settings', () => {
        //Ingresamos al area de Staff a través del menú Settings del usuario
        cy.get('a[id=ember34]').click()
        cy.url().should('include', '/settings')
        cy.screenshot('SignIn/change-fullname/P1_Settings')
        cy.wait(1000)
    });

    it('P2: Ingreso al menú Staff', () => {
        cy.contains('Staff').click()
        cy.wait(2000)
        cy.url().should('include', '/staff')
        cy.screenshot('SignIn/change-fullname/P2_Staff')
    });

    it('P3: Ingreso al OWNER', () => {
        //Accedemos al OWNER que se liste
        cy.get('span.user-list-item-figure').click()
        cy.wait(1000)
        cy.screenshot('SignIn/change-fullname/P3_Owner')
    });

    it('P4: Diligenciamiento de información', () => {
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
            cy.screenshot('SignIn/change-fullname/P4_StaffUpdated')

            cy.get('div.gh-user-avatar.relative').click()
            cy.get('h4').should('contain', FullName)
            cy.screenshot('SignIn/change-fullname/P5_StaffUpdated2')
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
            cy.screenshot('SignIn/change-fullname/P6_StaffOldUpdated')
    
            cy.get('div.gh-user-avatar.relative').click()
            cy.get('h4').should('contain', oldFullName)
            cy.screenshot('SignIn/change-fullname/P6_StaffOldUpdated2')
        })
    }); 

});

after(() => {
    cy.logout()
    cy.url().should('include', '/signin')
    cy.screenshot('SignIn/change-fullname/Logout')
  });  