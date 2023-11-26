class memberPage{
    elements={
        textNewMember: () => cy.contains('New member'),
        usernameInput: () => cy.getByTestInput('member-name'),
        useremailInput: () => cy.getByTestInput('member-email'),
        saveButton: () => cy.contains('Save'),
        newMember: () => cy.contains(Cypress.config('userMember')),
        getMember: () => cy.get('p.gh-members-list-email'),
        textNotSaveMember: () => cy.contains('Retry'),
        
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

    notSaveMember() {
        this.elements.textNotSaveMember()
    }

    visibleEmailMember(newuserEmail) {
        cy.contains(newuserEmail).should('be.visible')
    }
    
    visibleNameMember(newuserName) {
        cy.contains(newuserName).should('be.visible')
    } 

    getMember(){
        this.elements.getMember().first().click()
    }

    clearEmailMember(){
        this.elements.useremailInput().clear()
    }

    clearNameMember(){
        this.elements.usernameInput().clear()
    }
  
}

module.exports = new memberPage();