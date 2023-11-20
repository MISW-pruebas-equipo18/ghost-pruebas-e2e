class memberPage{
    elements={
        textNewMember: () => cy.contains('New member'),
        usernameInput: () => cy.getByTestInput('member-name'),
        useremailInput: () => cy.getByTestInput('member-email'),
        saveButton: () => cy.contains('Save'),
        newMember: () => cy.contains(Cypress.config('userMember')),
        getMember: () => cy.get('p.gh-members-list-email'),
        
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

    typeNewUseremail(newuserEmail){
        this.elements.useremailInput().type(newuserEmail)
    }    

    saveMember() {
        this.elements.saveButton().click()
    }

    visibleMember(userMember) {
        cy.contains(userMember).should('be.visible')
    }

    visibleEmailMember(newuserEmail) {
        cy.contains(newuserEmail).should('be.visible')
    }    

    getMember(){
        this.elements.getMember().first().click()
    }

    clearEmailMember(){
        this.elements.useremailInput().clear()
    }
  
}

module.exports = new memberPage();