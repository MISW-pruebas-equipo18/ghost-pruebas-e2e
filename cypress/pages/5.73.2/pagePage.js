class pagePage{
    elements = {
        pageTitle: () => cy.get('textarea.gh-editor-title'),
        content: () => cy.get('div.kg-prose'),
        publish: () => cy.contains('Publish'),
        pageItem: () => cy.get('li.gh-post-list-plain-status'),
        pageSettings: () => cy.get('button.settings-menu-toggle'),
        pageTags: () => cy.get('div[id=tag-input]'),
        btnNewPage: () => cy.contains('New page'),
        btnUpdate: () => cy.contains('Update'),
        returnPages: () => cy.contains('Pages'),
        btnPublish: () => cy.contains('Publish'),
        btnContinuePublish: () => cy.get('button[data-test-button="continue"]'),
        btnConfirmPublish: () => cy.get('button[data-test-button="confirm-publish"]'),
        btnBackEditor: () => cy.contains('Back to editor'),
        buttonClose: () => cy.get('button[data-test-button="close-notification"]'),
    }

    addTag(tag,pageName){
        this.elements.pageItem().contains(pageName).click()
        this.goToPageSettings()
        this.elements.pageTags().type(tag)
        this.elements.pageTags().type('{enter}')
        this.elements.pageTags().type('{esc}')
        this.goToPageSettings()
        this.elements.btnUpdate().click()
        this.elements.buttonClose().click()
    }

    returnToPages(){
        this.elements.returnPages().click()
    }

    createPage(title, content){
        this.elements.btnNewPage().click()

        if(title != null && title != "")
            this.elements.pageTitle().type(title)

        if(content != null && content != "")
            this.elements.content().type(content)
        else
        {
            this.elements.content().type("Prueba")
            this.elements.content().clear()
        }

        this.elements.btnPublish().click()
        this.elements.btnContinuePublish().click()
        this.elements.btnConfirmPublish().click()
    }

    createnullPage(){
        this.elements.btnNewPage().click()
        this.elements.pageTitle().type("Prueba")
        this.elements.pageTitle().clear()
        this.elements.content().type("Prueba")
        this.elements.content().clear()
        this.elements.btnPublish().click()
        this.elements.btnContinuePublish().click()
        this.elements.btnConfirmPublish().click()
    }

    goToPageSettings(){
        this.elements.pageSettings().click()
    }

    goToPageEditor(){
        this.elements.btnBackEditor().click()
    }
}

module.exports = new pagePage();