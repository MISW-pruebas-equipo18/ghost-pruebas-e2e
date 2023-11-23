import { registerCommands } from '../../../support/commands'
import homePage from '../../../pages/5.73.2/homePage'
import settingsPage from '../../../pages/5.73.2/settingsPage'
import staffPage from '../../../pages/5.73.2/staffPage'

registerCommands()

let user = Cypress.config('userv2')
let passw = Cypress.config('passwv2')

let Slug = "pruebas-automatizadas"
let oldSlug = ""
let version = "v2"
let postPrefix = "ghost-5.73.2/change-fullname-slug"
const tests = require('../../../fixtures/login.json')
let InitName = ""
before(() => {
    //Login in Application
    cy.loginAdmin(user,passw,version)
    cy.url().should('include', '/dashboard')
    cy.screenshot('SignIn/'+ postPrefix +'/Login')
});

describe ('Change Full Name', function(){
    tests.changeFullname.forEach((test) => {
        it(test.fullname, function(){
            //**************Give**************
            //1. Ingreso al menú settings
            homePage.goToSettings()
            cy.url().should('include', '/settings')
            cy.screenshot('SignIn/'+ postPrefix +'/P1_Settings')
            //2. Ingreso al menú Staff
            settingsPage.goToStaff()
            cy.url().should('include', '/staff')
            cy.screenshot('SignIn/'+ postPrefix +'/P2_Staff')
            //Ingreso al OWNER
            staffPage.goToOwner()
            cy.screenshot('SignIn/'+ postPrefix +'/P3_Owner')

            //**************When**************
            //Diligenciamiento de información
            let oldFullName = "";
            staffPage.elements.name().invoke('val')
            .then(sometext => {
                InitName = sometext
                let name= test.fullname
                //Cambian el nombre del usuario
                staffPage.changeFullName(name,"")    
                staffPage.goToStaff()
                cy.url().should('include', '/staff')

                //**************Then**************
                staffPage.elements.activeUsers().should('contain', name)
                cy.screenshot('SignIn/'+ postPrefix +'/P4_StaffUpdated')
                staffPage.goToHomePage()
                homePage.goToUserOptions()
                homePage.elements.userOptionsUser().should('contain', name)
                cy.screenshot('SignIn/'+ postPrefix +'/P5_StaffUpdated2')
                cy.wait(2000)
        
                /*
                //Go to reset full name
                //Accedemos al OWNER que se liste
                homePage.goToSettings()
                settingsPage.goToStaff()
                staffPage.goToOwner()
                cy.wait(2000)

                //Cambian el nombre del usuario
                staffPage.changeFullName(oldFullName,FullName)    
                
                staffPage.goToStaff()
                cy.url().should('include', '/staff')
                staffPage.elements.activeUsers().should('contain', oldFullName)
                cy.screenshot('SignIn/'+ postPrefix +'/P6_StaffOldUpdated')

                staffPage.goToHomePage()
                homePage.goToUserOptions()
                homePage.elements.userOptionsUser().should('contain', oldFullName)
                cy.screenshot('SignIn/'+ postPrefix +'/P6_StaffOldUpdated2')*/
            })

                //Then
            })
    })
});

/*after(() => {
    cy.logout()
    cy.url().should('include', '/signin')
    cy.screenshot('SignIn/'+ postPrefix +'/Logout')
  });  */