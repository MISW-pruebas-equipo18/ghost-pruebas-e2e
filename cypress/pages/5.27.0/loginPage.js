class loginPage {
    elements = {
        identification: () => cy.get('input[name=identification]'),
        password: () => cy.get('input[name=password]'),
        loginButton: () => cy.get('button.gh-btn-login')
    }

    login(user, passw) {
        this.elements.identification().clear()
        this.elements.password().clear()
        
        if(user != '' && user != null)
            this.elements.identification().type(user)

        if(passw != '' && passw != null)
            this.elements.password().type(passw)

        this.elements.loginButton().click()
    }
}

module.exports = new loginPage();