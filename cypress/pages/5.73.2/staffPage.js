class staffPage{
    elements={
        owner: () => cy.get('div[data-testid=owner-user]'),
        name: () => cy.get('input[id=":rm:"]'),
        email: () => cy.get('input[id=":rn:"]'),
        passwordOld: () => cy.get('input[id=":r14:"]'),
        passwordNew: () => cy.get('input[id=":r15:"]'),
        passwordVerfication: () => cy.get('input[id=":r16:"]'),
        saveButton: () => cy.contains('Save'),
        staff: () => cy.contains('Staff'),
        changePasswordButton: () => cy.contains('Change password'),
        btnconfirmChangePassword: () => cy.contains('Change password'),
        activeUsers: () => cy.get('div.group.flex.gap-3.cursor-pointer'),
        btnCloseNotification: () => cy.get('svg.w-3.h-3.text-white'),
        btnCancel:() => cy.contains('Cancel'),
        btnLeave:() => cy.contains('Leave'),
        returnHomePage: () => cy.contains('Done')
    }

    goToHomePage(){
        this.elements.returnHomePage().click()
    }

    goToOwner() {
        this.elements.owner().click()
    }

    goToChangePass(){
        this.elements.changePasswordButton().click()
    }

    changePass(oldPassw,newPassw){
        this.elements.changePasswordButton().click()
        this.elements.passwordOld().type(oldPassw)
        this.elements.passwordNew().type(newPassw)
        this.elements.passwordVerfication().type(newPassw)
        this.elements.btnconfirmChangePassword().click()
    }

    changeFullName(fullName,oldFullName){
        
        if(oldFullName != "" && oldFullName != null)
        {
            if(fullName == "" || fullName == null)
            {
                cy.get('input[value="'+ oldFullName +'"]').clear()
            }
            else
            {
                cy.get('input[value="'+ oldFullName +'"]').clear().type(fullName)
            }
            
            this.elements.saveButton().click()
            // cy.get('input[value="'+ oldFullName +'"]').invoke('data', 'id')
            // .then(dataId => {
            //     cy.get('input[id="'+ dataId +'"]').clear()
            //     cy.get('input[id="'+ dataId +'"]').type(fullName)});
        }
        else
        {
            this.elements.name().clear()
            this.elements.name().type(fullName)
            this.elements.saveButton().click()
        }
    }

    goToStaff(){
        this.elements.staff().click()
    }   

    closeNotification(){
        this.elements.btnCloseNotification().click()
    }
}

module.exports = new staffPage();