import { registerCommands } from '../../../support/commands'
import homePage from '../../../pages/5.73.2/homePage'
import settingsPage from '../../../pages/5.73.2/settingsPage'
import staffPage from '../../../pages/5.73.2/staffPage'

registerCommands()

let user = Cypress.config('userv2')
let passw = Cypress.config('passwv2')
let passw2 = Cypress.config('passwv2')
let version = "v2"
let postPrefix = "ghost-5.73.2/change-pass"
let screenShots = Cypress.config('screenShots')

const tests = require('../../../fixtures/login.json')
let oldPassw = passw
let newPassw = ""

// before(() => {
//     //Login in Application
//     cy.loginAdmin(user,passw,version)
//     cy.url().should('include', '/dashboard')
//     screenShots ? cy.screenshot('SignIn/'+ postPrefix +'/Login'): null
// });

describe ('Validate change of password', function(){
    tests.invalidPassword.forEach((test) => {
        it('P0: Change Password', function(){
            newPassw = test.password
            changePassw()
        });
    });
    
    it('P2: Reset Password', function(){
        newPassw = passw2
        passw = oldPassw
        console.log('New Password: ' + newPassw)
        console.log('Old Password: ' + oldPassw)
        changePassw()
    });
});

function changePassw()
{    
    //Login in Application
    cy.url().then(($url) => {
        console.log('URL: ' + $url)
        if ($url=='about:blank' || $url.includes('signin'))
        {
            cy.loginAdmin(user,passw,version)
            cy.url().should('include', '/dashboard')
            screenShots ? cy.screenshot('SignIn/'+ postPrefix +'/Login'): null
        }
    })

    //Ingresamos al area de Staff a través del menú Settings del usuario
    homePage.goToSettings()
    cy.url().should('include', '/settings')
    screenShots ? cy.screenshot('SignIn/'+ postPrefix +'/P1_settings'): null

    settingsPage.goToStaff()
    cy.url().should('include', '/staff')
    screenShots ? cy.screenshot('SignIn/'+ postPrefix +'/P2_staff'): null
    
    //Accedemos al OWNER que se liste
    staffPage.goToOwner()
    screenShots ? cy.screenshot('SignIn/'+ postPrefix +'/P3_owner'): null

    //Diligenciamos los campos y guardamos
    staffPage.changePass(passw,newPassw)

    cy.get('button').then(($btn) => {
        if ($btn.text().includes('Updated')){
            staffPage.elements.btnCancel().click()
        }
        else
        { 
            staffPage.elements.btnCancel().click()
            //staffPage.elements.btnLeave().click()
        }
    })

    staffPage.goToHomePage()
    cy.wait(1000)
    cy.url().should('include', '/dashboard')
    cy.wait(1000)

    //Deslogearse
    cy.logout()
    cy.url().should('include', '/signin')
    screenShots ? cy.screenshot('SignIn/'+ postPrefix +'/Logout'): null

    //Login in Application
    cy.loginAdmin(user,newPassw,version)

    cy.url().then(($url) => {
        if ($url.includes('/dashboard'))
        {
            oldPassw = newPassw
            passw = newPassw
        }
        else
        {
            oldPassw = oldPassw
            passw = oldPassw
        }
    })

    screenShots ? cy.screenshot('SignIn/'+ postPrefix +'/Login'): null
    cy.url().should('include', '/dashboard')
    
}  