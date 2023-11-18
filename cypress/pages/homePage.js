class homePage {
    elements = {
        userOptions: () => cy.get('svg.w3.mr1.fill-darkgrey'),
        signOut: () => cy.get('a[href="#/signout/"]'),
        settings: () => cy.get('a[href="#/settings/"]'),
        userOptionsUser: () => cy.get('h4.gh-user-name'),
    }

    logout() {
        this.elements.userOptions().click()
        this.elements.signOut().click()
    }

    goToUserOptions() {
        this.elements.userOptions().click()
    }

    goToSettings() {
        this.elements.settings().click()
    }
}

module.exports = new homePage();