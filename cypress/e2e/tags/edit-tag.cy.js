import { registerCommands } from '../../support/commands'

registerCommands()

let user = Cypress.env('user')
let passw = Cypress.env('passw')

describe ('Add tag', function(){

    before(( ) => {
        cy.login(user,passw)
        cy.url().should('include', '/dashboard')
    })    

    const tag = {
        oldName: 'Social',
        oldDescription: 'Contenido relacionado con temas sociales',
        newName: 'Naturaleza',
        newDescription: 'Contenido relacionado con temas de medio ambiente',
    };

    it('Add new tag', function(){
        cy.visit(Cypress.env('url_tags'))
        cy.contains(tag.oldName).click()
        cy.wait(1000)
        cy.getByTestInput('tag-name').clear()
        cy.getByTestInput('tag-name').type(tag.newName)
        cy.getByTestInput('tag-description').clear()
        cy.getByTestInput('tag-description').type(tag.newDescription)
        cy.contains('Save').click()
    });

    it('Verify new tag', function(){
        cy.visit(Cypress.env('url_tags'))
        cy.contains(tag.newName).should('be.visible')
    });
});