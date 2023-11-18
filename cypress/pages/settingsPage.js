class settingsPage{
    elements = {
        general: () => cy.get('a[href="#/settings/general/"]'),
        desing: () => cy.get('a[href="#/settings/design/"]'),
        navigation: () => cy.get('a[href="#/settings/navigation/"]'),
        staff: () => cy.get('a[href="#/settings/staff/"]'),
        announcementBar: () => cy.get('a[href="#/settings/announcement-bar/"]'),
        membership: () => cy.get('a[href="#/settings/members/"]'),
        emailNewsletter: () => cy.get('a[href="#/settings/newsletters/"]')
    }

    goToStaff() {
        this.elements.staff().click()
    }
}

module.exports = new settingsPage();