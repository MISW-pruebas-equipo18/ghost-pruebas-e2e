class postPage{
    elements = {
        newPost: () => cy.contains('New post'),
        title: () => cy.get('textarea.gh-editor-title'),
        content: () => cy.get('div[data-kg="editor"]'),
        publish: () => cy.contains('Publish'),
        returnPost: () => cy.contains('Posts'),
        returnEditor: () => cy.contains('Editor'),
        postTitle: () => cy.get('h3.gh-content-entry-title'),
        postContent: () => cy.get('div.gh-content-entry-excerpt'),
        postOptions: () => cy.get('button.post-settings'),
        postSettings: () => cy.get('a[href="#/editor/post/"]'),
        postDelete: () => cy.contains('Delete post'),
        postDeleteConfirm: () => cy.get('button.gh-btn.gh-btn-red.gh-btn-icon.ember-view'),
        publisType: () => cy.get('div[data-test-setting="publish-type"]'),
        publishOnly: () => cy.contains('Publish only'),
        continuePublish: () => cy.get('button[data-test-button="continue"]'),
        confirmPublish: () => cy.get('button[data-test-button="confirm-publish"]'),
        titleComplete: () => cy.get('span.green'),
        completeBrookmark: () => cy.get('div.gh-post-bookmark-title'),
        backEditor: () => cy.contains('Back to editor'),
        updateButton: () => cy.contains('Update'),
        notificationPublished: () => cy.get('span.gh-notification-title'),
        buttonClose: () => cy.get('button[data-test-button="close-notification"]'),
        postSettings: () => cy.get('button.settings-menu-toggle'),
        postListItem: () => cy.get('li.gh-posts-list-item'),
        unPublish: () => cy.contains('Unpublish'),
        unPublishConfirm: () => cy.get('button.gh-revert-to-draft'),
    }

    updatePost(title,content){
        this.fillPost(title,content)
        this.elements.publish().click()
        this.elements.updateButton().click()
    }   

    createAndPublishPost(title,content){
        this.fillPost(title,content)
        this.elements.publish().click()
        this.goToPublishType()
        this.publishOnly()
        this.goToContinuePublish()
        this.goConfirmPublish()
    }

    updateAndPublishPost(title,content){
        this.fillPost(title,content)
        this.elements.publish().click()
    }

    newPost(){
        this.elements.newPost().click()
    }   

    fillAndSaveNullPost(){
        this.elements.title().type("title")
        this.elements.title().clear()
        this.elements.content().type("Prueba")
        this.elements.content().clear()
        this.elements.publish().click()
    }

    fillPost(title,content){
        this.elements.title().clear()
        this.elements.title().type(title)
        this.elements.content().clear()
        this.elements.content().type(content)
    }

    publishOnly(){
        this.elements.publishOnly().click()
    }

    goToPublishType(){
        this.elements.publisType().click()
    }

    goToContinuePublish(){
        this.elements.continuePublish().click()
    }

    goConfirmPublish(){
        this.elements.confirmPublish().click()
    }

    goBackEditor(){
        this.elements.backEditor().click()
    }

    clickButtonClose(){
        this.elements.buttonClose().click()
    }

    goreturnPost(){
        this.elements.returnPost().click()
    }

    goreturnEditor(){
        this.elements.returnEditor().click()
    }

    goToPostSettings(){
        this.elements.postSettings().click()
    }

    deletePost(){
        this.elements.postDelete().click()
        this.elements.postDeleteConfirm().click()
    }

    openDraftPost(postTitle){
        cy.contains(postTitle).click()
    }

    goToUnpublish(){
        this.elements.unPublish().click()
    }

    confirmunPublish(){
        this.elements.unPublishConfirm().click()
    }
}

module.exports = new postPage();