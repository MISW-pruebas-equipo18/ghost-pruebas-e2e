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
        inputLanguage: () => cy.get("input[placeholder=\"en\"]"),
        saveButtonLanguage: () => cy.get('[data-testid="publication-language"] > .items-start > .-mt-0\.5 > .flex > .text-green > span'),
        editRecommendations: () => cy.get('[data-testid="recommendations"] > .items-start > .-mt-0\.5 > .cursor-pointer > span'),
        inputRecommendations: () => cy.get("input[placeholder=\"https://www.example.com\"]"),
        editTitleDescription: () => cy.get('[data-testid="title-and-description"] > .items-start > .-mt-0\.5 > .flex > .cursor-pointer > span'),
        inputTitle: () => cy.get("input[placeholder=\"Site title\"]"),
        inputDescription: () => cy.get("input[placeholder=\"Site description\"]"),
        saveButtonTitleDescription: () => cy.get('[data-testid="title-and-description"] > .items-start > .-mt-0\.5 > .flex > .text-green > span')
        
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

    clickEditRecommendations() {
        this.elements.editRecommendations().click()
    }

    typeInputRecommendations(url) {
        this.elements.inputRecommendations().type(url)
    }

    clickEditTitleDescription() {
        this.elements.editTitleDescription().click()
    }

    clearTitle(){
        this.elements.inputTitle().clear()
    }

    clearDescription(){
        this.elements.inputDescription().clear()
    }

    typeInputTitle(title) {
        this.elements.inputTitle().type(title)
    }

    typeInputDescription(description) {
        this.elements.inputDescription().type(description)
    }

    saveTitleDescription() {
        this.elements.saveButtonTitleDescription().click()
    }
 
}

module.exports = new settingsPage();