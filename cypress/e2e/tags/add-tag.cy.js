import { registerCommands } from '../../support/commands'

registerCommands()


describe ('Add tag', function(){

    const tag = {
        name: 'Social',
        description: 'Contenido relacionado con temas sociales'
    };

    it('Add new tag', function(){
        cy.visit(Cypress.env('url_tags'))
        cy.contains('New tag').click()
        cy.wait(1000)
        cy.url().should('include', '/new')
        cy.getByTestInput('tag-name').type(tag.name)
        cy.getByTestInput('tag-description').type(tag.description)
        cy.contains('Save').click()
    });

    it('Verify new tag', function(){
        cy.visit(Cypress.env('url_tags'))
        cy.contains(tag.name).should('be.visible')
    });
});