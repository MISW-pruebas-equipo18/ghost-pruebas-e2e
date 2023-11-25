class staffPage{
    elements={
        btnInvite: () => cy.contains('Invite people'), 
        inputInvite: () => cy.get(".peer"), 
        textInvite: () => cy.contains('Send invitation now'),
        btnProfileOwner: () => cy.getByTestId('owner-user'),
        checkboxProfile: () => cy.get('input[type="checkbox"]'),
        saveButton: () => cy.contains('Save & close'), 
        owner: () => cy.get('div[data-testid=owner-user]'),
        name: () => cy.get('input[id=":rm:"]'),
        email: () => cy.get('input[id=":rn:"]'),
        passwordOld: () => cy.get('input[type="password"]').first(),
        passwordNew: () => cy.get('input[type="password"]').eq(1),
        passwordVerfication: () => cy.get('input[type="password"]').eq(2),
        saveButton: () => cy.contains('Save'),
        staff: () => cy.contains('Staff'),
        changePasswordButton: () => cy.contains('Change password'),
        btnconfirmChangePassword: () => cy.contains('Change password'),
        activeUsers: () => cy.get('div.group.flex.gap-3.cursor-pointer'),
        btnCloseNotification: () => cy.get('svg.w-3.h-3.text-white'),
        btnCancel:() => cy.contains('Cancel'),
        btnLeave:() => cy.contains('Leave'),
        returnHomePage: () => cy.contains('Done')
    }

    goToHomePage(){
        this.elements.returnHomePage().click()
    }

    goToOwner() {
        this.elements.owner().click()
    }

    goToChangePass(){
        this.elements.changePasswordButton().click()
    }

    changePass(oldPassw,newPassw){
        this.elements.changePasswordButton().click()
        this.elements.passwordOld().type(oldPassw)
        if(newPassw != "" && newPassw != null)
        {
            this.elements.passwordNew().type(newPassw)
            this.elements.passwordVerfication().type(newPassw)
        }
        else
        {
            this.elements.passwordNew().clear()
            this.elements.passwordVerfication().clear()
        }

        this.elements.btnconfirmChangePassword().click()
    }

    changeFullName(fullName,oldFullName){
        console.log("oldFullName: " + oldFullName)
        
        if(oldFullName != "" && oldFullName != null)
        {
            if(fullName == "" || fullName.length > 200 )
            {
                fullName.length > 200 ? cy.get('input[value="'+ oldFullName +'"]').type(fullName) : cy.get('input[value="'+ oldFullName +'"]').clear()

                this.elements.saveButton().click()
                this.elements.btnCancel().click()
                this.elements.btnCloseNotification().click()
                this.elements.btnLeave().click()
            }
            else
            {
                cy.get('input[value="'+ oldFullName +'"]').clear().type(fullName)
                this.elements.saveButton().click()
            }
        }
        else
        {
            this.elements.name().clear()
            this.elements.name().type(fullName)
            this.elements.saveButton().click()
        }
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