class staffPage{
    elements={
        btnInvite: () => cy.contains('Invite people'), 
        inputInvite: () => cy.get(".peer"), 
        inputInviteOldVersion : () => cy.get('input[name="email"]'),
        textInvite: () => cy.contains('Send invitation now'),
        btnProfileOwner: () => cy.getByTestId('owner-user'),
        checkboxProfile: () => cy.get('input[type="checkbox"]'),
        saveButton: () => cy.contains('Save & close'), 
        
    }

    btnInvite(){
        this.elements.btnInvite().click()
    }

    includeUrl(url){
        cy.url().should('include', url)
    }

    typeInviteMember(emailUserInvited){
        this.elements.inputInvite().type(emailUserInvited)
    }

    typeInviteMemberOldVersion(emailUserInvited){
        this.elements.inputInviteOldVersion().type(emailUserInvited)
    }

    sendInvitation(){
        this.elements.textInvite().click()
    }

    clickBtnProfile(){
        this.elements.btnProfileOwner().click()
    }

    verifyCheckedComments(){
        this.elements.checkboxProfile().eq(0).should('be.checked')
    }

    saveProfile() {
        this.elements.saveButton().click()
    }
  
}

module.exports = new staffPage();