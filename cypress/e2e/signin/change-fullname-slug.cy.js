import { registerCommands } from '../../support/commands'
import homePage from '../../pages/homePage'
import settingsPage from '../../pages/settingsPage'
import staffPage from '../../pages/staffPage'

registerCommands()

let user = Cypress.config('user')
let passw = Cypress.config('passw')

let FullName ="PRUEBAS AUTOMATIZADAS"
let Slug = "pruebas-automatizadas"
let oldSlug = ""

before(() => {
    //Login in Application
    cy.loginAdmin(user,passw)
    cy.url().should('include', '/dashboard')
    cy.screenshot('SignIn/invalid-change-pass/Login')
});

describe ('Change Full Name', function(){

    it('P1: Ingreso al menú settings', () => {
        homePage.goToSettings()
        cy.url().should('include', '/settings')
        cy.screenshot('SignIn/change-fullname/P1_Settings')
    });

    it('P2: Ingreso al menú Staff', () => {
        settingsPage.goToStaff()
        cy.url().should('include', '/staff')
        cy.screenshot('SignIn/change-fullname/P2_Staff')
    });

    it('P3: Ingreso al OWNER', () => {
        staffPage.goToOwner()
        cy.screenshot('SignIn/change-fullname/P3_Owner')
    });

    it('P4: Diligenciamiento de información', () => {
        //Diligenciamos los campos y guardadmos
        let oldFullName = "";
        staffPage.elements.name().invoke('val')
        .then(sometext => {
            oldFullName = sometext
            
            //Cambian el nombre del usuario
            staffPage.changeFullName(FullName)    
            staffPage.goToStaff()
            cy.url().should('include', '/staff')
            staffPage.elements.activeUsers().should('contain', FullName)
            //cy.get('h3').should('contain', FullName)
            cy.screenshot('SignIn/change-fullname/P4_StaffUpdated')

            homePage.goToUserOptions()
            homePage.elements.userOptionsUser().should('contain', FullName)
            cy.screenshot('SignIn/change-fullname/P5_StaffUpdated2')
            cy.wait(2000)
    
            //Go to reset full name
            //Accedemos al OWNER que se liste
            staffPage.goToOwner()

            //Cambian el nombre del usuario
            staffPage.changeFullName(oldFullName)    
            staffPage.goToStaff()
            cy.url().should('include', '/staff')
            staffPage.elements.activeUsers().should('contain', oldFullName)
            cy.screenshot('SignIn/change-fullname/P6_StaffOldUpdated')
    
            homePage.goToUserOptions()
            homePage.elements.userOptionsUser().should('contain', oldFullName)
            cy.screenshot('SignIn/change-fullname/P6_StaffOldUpdated2')
        })
    }); 

});

after(() => {
    cy.logout()
    cy.url().should('include', '/signin')
    cy.screenshot('SignIn/change-fullname/Logout')
  });  