class tagPage{
    elements = {
        btnPublicTag: () => cy.contains('Public tags'),
        btnNewTag: () => cy.contains('New tag'),
        tagItem: () => cy.get('li.gh-tags-list-item'),
        nameTag: () => cy.get('input[name=name]'),
        slugTag: () => cy.get('input[name=slug]'),
        descriptionTag: () => cy.get('textarea[name=description]'),
        colorTag: () => cy.get('input[name=accent-color]'),
        btnSaveTag: () => cy.contains('Save'),
        viewActions: () => cy.get('section.view-actions'),
        returnTags:() => cy.get('a[data-test-link=tags-back]'),
        btnLeave: () => cy.contains('Leave'),
        btnDeleteTag: () => cy.contains('Delete tag'),
        btnConfirmDelete: () => cy.get('button.gh-btn.gh-btn-red.gh-btn-icon.ember-view')
    }

    createTag(name, slug, description/*, color*/){
        this.elements.btnNewTag().click()

        if(name != null && name != "")
            this.elements.nameTag().type(name)
        else
            this.elements.nameTag().clear()

        if(slug != null && slug != "")
            this.elements.slugTag().type(slug)
        else
            this.elements.slugTag().clear()

        if(description != null && description != "")
            this.elements.descriptionTag().type(description)
        else
            this.elements.descriptionTag().clear()
        //this.elements.colorTag().type(color)

        this.elements.btnSaveTag().click()
    }

    deleteTag(name){
        this.elements.tagItem().contains(name).click()
        cy.wait(1000)
        this.elements.btnDeleteTag().click()
        cy.wait(1000)
        this.elements.btnConfirmDelete().click()
    }

    returnToTags(){
        this.elements.returnTags().click()
    }
}

module.exports = new tagPage();