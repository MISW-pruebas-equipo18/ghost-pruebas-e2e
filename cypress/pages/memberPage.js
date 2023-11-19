class memberPage{
    elements={
        textNewMember: () => cy.contains('New member'),
        usernameInput: () => cy.getByTestInput('member-name'),
        useremailInput: () => cy.getByTestInput('member-email'),
        saveButton: () => cy.contains('Save'),
        newMember: () => cy.contains(Cypress.config('userMember'))
        
    }

    addNewMember() {
        this.elements.textNewMember().click()
    }

    typeUsername(userMember){
        this.elements.usernameInput().type(userMember)
    }

    typeUseremail(userEmail){
        this.elements.useremailInput().type(userEmail)
    }

    saveNewMember() {
        this.elements.saveButton().click()
    }

    visibleMember(userMember) {
        cy.contains(userMember).should('be.visible')
    }
  
}

module.exports = new memberPage();