class homePage {
    elements = {
        userOptions: () => cy.get('svg.w3.mr1.fill-darkgrey'),
        signOut: () => cy.get('a[href="#/signout/"]'),
        settings: () => cy.get('a[href="#/settings/"]')
    }

    logout() {
        this.elements.userOptions().click()
        this.elements.signOut().click()
    }

    goToSettings() {
        this.elements.settings().click()
    }
}

module.exports = new homePage();