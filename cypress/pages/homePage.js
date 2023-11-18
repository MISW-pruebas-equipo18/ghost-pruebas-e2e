class homePage {
    elements = {
        userOptions: () => cy.get('svg.w3.mr1.fill-darkgrey'),
        signOut: () => cy.get('a[href="#/signout/"]'),
        settings: () => cy.get('a[href="#/settings/"]'),
        posts: () => cy.contains('a', 'Posts'),
        pages: () => cy.get('a[href="#/pages/"]'),
        tags: () => cy.get('a[href="#/tags/"]'),
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

    gotoPosts() {
        this.elements.posts().click()
    }

    goToPages() {
        this.elements.pages().click()
    }   

    goToTags() {
        this.elements.tags().click()
    }   
}

module.exports = new homePage();