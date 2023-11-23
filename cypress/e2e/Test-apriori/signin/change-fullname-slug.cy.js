import { registerCommands } from '../../../support/commands'
import homePage from '../../../pages/5.73.2/homePage'
import settingsPage from '../../../pages/5.73.2/settingsPage'
import staffPage from '../../../pages/5.73.2/staffPage'

registerCommands()

let user = Cypress.config('userv2')
let passw = Cypress.config('passwv2')
let screenShots = Cypress.config('screenShots')

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
    screenShots ? cy.screenshot('SignIn/'+ postPrefix +'/Login'): null
});

describe ('Change Full Name', function(){
    let oldFullName = "";

    it('Ingreso menú settings', function(){ 
        //1. Ingreso al menú settings
        homePage.goToSettings()
        cy.url().should('include', '/settings')
        screenShots ? cy.screenshot('SignIn/'+ postPrefix +'/P1_Settings') : null
    })

    tests.changeFullname.forEach((test) => {
        it(test.fullname, function(){
            //**************Give**************
            //2. Ingreso al menú Staff
            settingsPage.goToStaff()
            cy.url().should('include', '/staff')
            screenShots ? cy.screenshot('SignIn/'+ postPrefix +'/P2_Staff'): null

            //Ingreso al OWNER
            staffPage.goToOwner()
            screenShots ? cy.screenshot('SignIn/'+ postPrefix +'/P3_Owner'): null

            //**************When**************
            //Diligenciamiento de información            
            console.log("InitName: " + InitName)
            if(InitName == "")
                staffPage.elements.name().invoke('val').then(sometext => {InitName = sometext})

            let name= test.fullname
            //Cambian el nombre del usuario
            staffPage.changeFullName(name,oldFullName)    
            staffPage.goToStaff()
            cy.url().should('include', '/staff')

            //**************Then**************
            if(name == "" || name.length >= 200 )
                staffPage.elements.activeUsers().should('contain', "oldFullName")
            else
                staffPage.elements.activeUsers().should('contain', name)

            screenShots ? cy.screenshot('SignIn/'+ postPrefix +'/P4_StaffUpdated'): null

            staffPage.goToHomePage()
            homePage.goToUserOptions()

            if(name == "" || name.length >= 200 )
                homePage.elements.userOptionsUser().should('contain', "oldFullName")
            else
                homePage.elements.userOptionsUser().should('contain', name)

            screenShots ? cy.screenshot('SignIn/'+ postPrefix +'/P5_StaffUpdated2'): null
            cy.wait(2000)

            oldFullName = name != "" && name.length <=200 ? name : oldFullName
            homePage.goToSettings()
            
            //Then
            })
    })

    it('Reset Full Name', function(){
        //Go to reset full name
        //Accedemos al OWNER que se liste
        homePage.goToSettings()
        settingsPage.goToStaff()
        staffPage.goToOwner()
        cy.wait(2000)

        //Cambian el nombre del usuario
        staffPage.changeFullName(InitName,oldFullName)    
        
        staffPage.goToStaff()
        cy.url().should('include', '/staff')
        staffPage.elements.activeUsers().should('contain', InitName)
        screenShots ? cy.screenshot('SignIn/'+ postPrefix +'/P6_StaffOldUpdated'): null

        staffPage.goToHomePage()
        homePage.goToUserOptions()
        homePage.elements.userOptionsUser().should('contain', InitName)
        screenShots ? cy.screenshot('SignIn/'+ postPrefix +'/P6_StaffOldUpdated2'): nullx
    })
});

/*after(() => {
    cy.logout()
    cy.url().should('include', '/signin')
    screenShots ? cy.screenshot('SignIn/'+ postPrefix +'/Logout')
  });  */