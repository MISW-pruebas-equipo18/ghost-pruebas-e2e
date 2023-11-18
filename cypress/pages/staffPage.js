class staffPage{
    elements={
        owner: () => cy.get('span.user-list-item-figure'),
        name: () => cy.get('input.gh-input.user-name'),
        email: () => cy.get('input[name=email]'),
        passwordOld: () => cy.get('input[id=user-password-old]'),
        passwordNew: () => cy.get('input[id=user-password-new]'),
        passwordVerfication: () => cy.get('input[id=user-new-password-verification]'),
        password: () => cy.get('input[name=password]'),
        saveButton: () => cy.get('button.gh-btn.gh-btn-blue.gh-btn-icon.ember-view'),
        staffList: () => cy.get('li.gh-user-list-item.ember-view'),
        staffName: () => cy.get('h3.gh-user-list-name'),
        staffEmail: () => cy.get('p.gh-user-list-email'),
        changePasswordButton: () => cy.contains('Change Password')
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

}

module.exports = new staffPage();