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
        returnHomePage: () => cy.contains('Done'),
        editLanguage: () => cy.get('[data-testid="publication-language"] > .items-start > .-mt-0\.5 > .flex > .cursor-pointer > span'),
        inputLanguage: () => cy.get("input[placeholder=\"en\"]").type("<3"),
        saveButtonLanguage: () => cy.get('[data-testid="publication-language"] > .items-start > .-mt-0\.5 > .flex > .text-green > span')
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

    clickEditLanguage() {
        this.elements.editLanguage().click()
    }

    getInputLanguage(text) {
        this.elements.inputLanguage().type(text)
    }

    saveLanguage() {
        this.elements.saveButtonLanguage().click()
    }
 
}

module.exports = new settingsPage();