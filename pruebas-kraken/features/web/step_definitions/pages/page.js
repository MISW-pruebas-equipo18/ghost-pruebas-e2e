const fpages = {
    btnEditor:"button.gh-back-to-editor",
    list:'a[href="#/pages/"]',
    newButton:'a[href="#/editor/page/"]',
    titleInput:"textarea.gh-editor-title",
    bodyInput:'p[data-koenig-dnd-droppable="true"]',
    publishButton:'button[class="gh-btn gh-btn-editor darkgrey gh-publish-trigger"]',
    continueButton:'button[data-test-button="continue"]',
    confirmButton: 'button[data-test-button="confirm-publish"]',
    pagesElements: "h3.gh-content-entry-title",
    statusElement: "p:nth-child(3)",
    saveButton:'button[class="gh-btn gh-btn-editor gh-editor-save-trigger green ember-view"]',
    unpublishButton: 'button[class="gh-btn gh-btn-editor darkgrey gh-unpublish-trigger"]',
    draftButton: 'button[data-test-button="revert-to-draft"]',
    pageSettings: "button.settings-menu-toggle",
    pageTags: "div[id=tag-input]",
    MsjError: "gh-alert-content",
    leaveButton: 'button[class="gh-btn gh-btn-red"]'
                                 
};

  module.exports = {
    fpages
  };

  