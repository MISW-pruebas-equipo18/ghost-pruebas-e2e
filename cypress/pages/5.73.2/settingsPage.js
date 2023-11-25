class settingsPage{
    elements = {
        general: () => cy.get('a[href="#/settings/general/"]'),
        desing: () => cy.get('a[href="#/settings/design/"]'),
        navigation: () => cy.get('a[href="#/settings/navigation/"]'),
        staff: () => cy.get('a').contains('Staff'),
        announcementBar: () => cy.get('a[href="#/settings/announcement-bar/"]'),
        membership: () => cy.get('a[href="#/settings/members/"]'),
        emailNewsletter: () => cy.get('a[href="#/settings/newsletters/"]'),
        editCode: () => cy.get('[data-testid="code-injection"] > .items-start > .-mt-0\.5 > .flex > .cursor-pointer > span'),
        editorCode: () => cy.get('[data-testid="header-code"] > .cm-editor > .cm-scroller'),
        saveButton: () => cy.get('[data-testid="code-injection"] > .items-start > .-mt-0\.5 > .flex > .text-green > span'),
        returnHomePage: () => cy.contains('Done')
    }

    goToStaff() {
        this.elements.staff().click()
    }

    clickEditCode() {
        this.elements.editCode().click()
    }

    typeCode(code){
        this.elements.editorCode().type(code)
    }

    saveCode() {
        this.elements.saveButton().click()
    }

    returnHomePage() {
        this.elements.returnHomePage().click()
    }
}

module.exports = new settingsPage();