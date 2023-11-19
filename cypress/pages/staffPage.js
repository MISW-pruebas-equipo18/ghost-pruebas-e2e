class staffPage{
    elements={
        owner: () => cy.get('span.user-list-item-figure'),
        name: () => cy.get('input.gh-input.user-name'),
        email: () => cy.get('input[name=email]'),
        passwordOld: () => cy.get('input[id=user-password-old]'),
        passwordNew: () => cy.get('input[id=user-password-new]'),
        passwordVerfication: () => cy.get('input[id=user-new-password-verification]'),
        saveButton: () => cy.contains('Save'),
        staff: () => cy.contains('Staff'),
        changePasswordButton: () => cy.contains('Change Password'),
        activeUsers: () => cy.get('section.gh-main-section.gh-active-users '),
        btnCloseNotification: () => cy.get('button.gh-notification-close'),
    }

    goToOwner() {
        this.elements.owner().click()
    }

    changePass(oldPassw,newPassw){
        this.elements.passwordOld().type(oldPassw)
        this.elements.passwordNew().type(newPassw)
        this.elements.passwordVerfication().type(newPassw)
        this.elements.changePasswordButton().click()
    }

    changeFullName(fullName){
        this.elements.name().clear()
        this.elements.name().type(fullName)
        this.elements.saveButton().click()
    }

    goToStaff(){
        this.elements.staff().click()
    }   

    closeNotification(){
        this.elements.btnCloseNotification().click()
    }
}

module.exports = new staffPage();