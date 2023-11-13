const { Given, When, Then } = require('@cucumber/cucumber');
const { assert, expect } = require('chai');

Given('I login to Ghost Admin with {kraken-string} user and {kraken-string} password', async function (username, password) {
    await this.driver.url('http://localhost:2368/ghost/#/signin');
    await this.driver.pause(5000);

    let userInput = await this.driver.$('#identification');
    await userInput.setValue(username);

    let passwordInput = await this.driver.$('#password');
    await passwordInput.setValue(password);

    let loginButton = await this.driver.$('button.login');
    await loginButton.click();

    await this.driver.pause(3000);
    let currentTitle = await this.driver.$('h2.gh-canvas-title'); 
    expect(await currentTitle.getText()).to.equal('Dashboard');
});

Then('I logout', async function () {
    let avatarButton = await this.driver.$('div[class="pe-all"] > div:first-child');
    await avatarButton.click();

    let signoutButton = await this.driver.$('a[href="#/signout/"]');
    await this.driver.pause(2000);
    await signoutButton.click();
});

When('Title is {string}', async function (pageTitle) {
   let currentTitle = await this.driver.$('h2.gh-canvas-title'); 
   expect(await currentTitle.getText()).to.equal(pageTitle);
});

When('I go to posts view', async function () {
    let postsLink = await this.driver.$('a[href="#/posts/"]'); // id: ember9
    await postsLink.click();
});

When('I go to new post view', async function () {
    let newPostButton = await this.driver.$('a[href="#/editor/post/"]');
    await newPostButton.click();
});

When('I write a post with title {string} and body {string}', async function (title, body) {
    let titleInput = await this.driver.$('textarea.gh-editor-title');
    await titleInput.setValue(title);

    // Wait 1 second
    
    await this.driver.pause(500);
    let bodyInput = await this.driver.$('div[class="kg-prose"] > p');
    bodyInput.click();

    await this.driver.pause(500);
    await bodyInput.setValue(body);
});

When('I publish the post', async function () {
    let publishButton = await this.driver.$('button[class="gh-btn gh-btn-editor darkgrey gh-publish-trigger"]')
    await publishButton.click();

    let publishButton2 = await this.driver.$('button[data-test-button="continue"]');
    await publishButton2.click();

    let publishButton3 = await this.driver.$('button[data-test-button="confirm-publish"]');
    await publishButton3.click();
});

When('I update the post', async function () {
    let updatebutton = await this.driver.$('button[data-test-button="publish-save"]');
    await updatebutton.click();
});

When('I go back to editor view', async function () {
    let back1 = await this.driver.$('button.gh-publish-back-button')
    await back1.click();
});

When('I go back to posts view', async function () {
    let back2 = await this.driver.$('a[href="#/posts/"]')
    await back2.click();
});

Then('I should see a post with title {string} and status {string}', async function (title, status) {
    let titleElements = await this.driver.$$('h3.gh-content-entry-title');

    let found = false;
    for (let titleElement of titleElements) {
        if (await titleElement.getText() == title) {
            found = true;

            let statusElement = await titleElement.$('..').$('p:nth-child(3)');
            statusElement = await statusElement.getText();
            expect(statusElement).to.equal(status);
            break;
        }
    }

    expect(found).to.be.true;
});

Then ('I should not see a post with title {string}', async function (title) {
    let titleElements = await this.driver.$$('h3.gh-content-entry-title');

    let found = false;
    for (let titleElement of titleElements) {
        if (await titleElement.getText() == title) {
            found = true;
            break;
        }
    }

    expect(found).to.be.false;
});

When('I click on the post with title {string}', async function (title) {
    let titleElements = await this.driver.$$('h3.gh-content-entry-title');

    let found = false;
    for (let titleElement of titleElements) {
        if (await titleElement.getText() == title) {
            found = true;
            await titleElement.click();
            break;
        }
    }

    expect(found).to.be.true;
});

When('I delete the post with title {string}', async function (title) {
    let titleElements = await this.driver.$$('h3.gh-content-entry-title');

    let found = false;
    for (let titleElement of titleElements) {
        if (await titleElement.getText() == title) {
            found = true;
            let parent = await titleElement.$('../..');
            // Right click parent
            await parent.click({ button: 'right' });

            let deleteButton = await this.driver.$('span[class="red"]');
            await deleteButton.click();

            let confirmButton = await this.driver.$('button[class="gh-btn gh-btn-red gh-btn-icon ember-view"]');
            await confirmButton.click();
            break;
        }
    }

    expect(found).to.be.true;

    let notificationClose = await this.driver.$('button[class="gh-notification-close"]');
    await notificationClose.click();
});

Then('I delete all remaining posts', async function () {
    let titleElements = await this.driver.$$('h3.gh-content-entry-title');

    for (let titleElement of titleElements) {
        let parent = await titleElement.$('../..');
        // Right click parent
        await parent.click({ button: 'right' });

        let deleteButton = await this.driver.$('span[class="red"]');
        await deleteButton.click();

        let confirmButton = await this.driver.$('button[class="gh-btn gh-btn-red gh-btn-icon ember-view"]');
        await confirmButton.click();
        
        await this.driver.pause(500);

        let notificationClose = await this.driver.$('button[class="gh-notification-close"]');
        await notificationClose.click();
    }
});

/**************************************************************************************************** INICIO TAGS **/
When('I go to list tags view', async function () {
    let tagsLink = await this.driver.$('a[href="#/tags/"]'); 
    await tagsLink.click();
});

When('I go to new tags view', async function () {
    let newtagsButton = await this.driver.$('a[href="#/tags/new/"]');
    await newtagsButton.click();
});

When('I create a new tag with name {string} and description {string} and color {string}', async function (name, description, color) {
    let nameInput = await this.driver.$('#tag-name');
    await nameInput.setValue(name);

    /*let colorInput = await this.driver.$('input[class="gh-input"]');
    await colorInput.setValue(color);*/

    let descriptionInput = await this.driver.$('#tag-description');
    descriptionInput.click();
    await this.driver.pause(1000);
    await descriptionInput.setValue(description);

    let saveButton =  await this.driver.$('button[class="gh-btn gh-btn-primary gh-btn-icon ember-view"]');
    saveButton.click();
    await this.driver.pause(1000);

});

Then('I validate tag with name {string}', async function (nameTag) {
    
    let tagsElements = await this.driver.$$('h3.gh-tag-list-name');

    let found = false;
    for (let name of tagsElements) {
        if (await name.getText() == nameTag) {
            found = true;
            break;
        }
    }

    expect(found).to.be.true;
});


When('I selected tag with name {string}', async function (nameTag) {
    let tagElements = await this.driver.$$('h3.gh-tag-list-name');

    let found = false;
    for (let tagElement of tagElements) {
        if (await tagElement.getText() == nameTag) {
            found = true;
            await tagElement.click();
            break;
        }
    }

    expect(found).to.be.true;
});

When('I update tag with new name {string}', async function (newName) {
    let nameInput = await this.driver.$('#tag-name');
    await nameInput.setValue(newName);
    await this.driver.pause(1000);

    let saveButton =  await this.driver.$('button[class="gh-btn gh-btn-primary gh-btn-icon ember-view"]');
    saveButton.click();
    await this.driver.pause(1000);

});

When('I delete tag with name {string}', async function (name) {
    
    let deleteButton =  await this.driver.$('button[class="gh-btn gh-btn-red gh-btn-icon"]');
    deleteButton.click();
    await this.driver.pause(1000);

    let confirmButton =  await this.driver.$('button[class="gh-btn gh-btn-red gh-btn-icon ember-view"]');
    confirmButton.click();
    await this.driver.pause(1000);

});


Then('I validate delete tag with name {string}', async function (nameTag) {
    
    let tagsElements = await this.driver.$$('h3.gh-tag-list-name');
    let found = false;

    
    for (let name of tagsElements) {
        if (await name.getText() == nameTag) {
            found = true;
            break;
        }
    }

    expect(found).to.be.false;
});

/**************************************************************************************************** FIN TAGS **/

/**************************************************************************************************** INICIO PAGES **/
When('I go to list pages view', async function () {
    let pagesLink = await this.driver.$('a[href="#/pages/"]'); 
    await pagesLink.click();
});

When('I go back to editor pages', async function () {
    let pagesLink1 = await this.driver.$('button.gh-back-to-editor') 
    await pagesLink1.click();
});


When('I go back to list pages view', async function () {
    let pagesLink2 = await this.driver.$('a[href="#/pages/"]')
    await pagesLink2.click();
});





When('I go to new pages view', async function () {
    let newPagesButton = await this.driver.$('a[href="#/editor/page/"]');
    await newPagesButton.click();
});

When('I create new pages with title {string} and body {string}', async function (title, body) {
    let titleInput = await this.driver.$('textarea.gh-editor-title');
    await titleInput.setValue(title);
    await this.driver.pause(1000);

    let bodyInput = await this.driver.$('div[class="kg-prose"] > p');
    bodyInput.click();

    await this.driver.pause(1000);
    await bodyInput.setValue(body);
});

When('I publish the pages', async function () {
    let publishButton = await this.driver.$('button[class="gh-btn gh-btn-editor darkgrey gh-publish-trigger"]')
    await publishButton.click();
    await this.driver.pause(1000);

    let publishButton2 = await this.driver.$('button[data-test-button="continue"]');
    await publishButton2.click();
    await this.driver.pause(1000);

    let publishButton3 = await this.driver.$('button[data-test-button="confirm-publish"]');
    await publishButton3.click();
    await this.driver.pause(1000);
});


Then('I should see a pages with title {string} and status {string}', async function (title, status) {
    let titleElements = await this.driver.$$('h3.gh-content-entry-title');

    let found = false;
    for (let titleElement of titleElements) {
        if (await titleElement.getText() == title) {
            found = true;

            let statusElement = await titleElement.$('..').$('p:nth-child(3)');
            statusElement = await statusElement.getText();
            expect(statusElement).to.equal(status);
            break;
        }
    }

    expect(found).to.be.true;
});

Then('I validate pages with name {string}', async function (title) {
    
    let pagesElements = await this.driver.$$('h3.gh-content-entry-title');

    let found = false;
    for (let titlePage of pagesElements) {
        if (await titlePage.getText() == title) {
            found = true;
            break;
        }
    }

    expect(found).to.be.true;
});

When('I selected pages with name {string}', async function (title) {
    let pagesElements = await this.driver.$$('h3.gh-content-entry-title');

    let found = false;
    for (let titlePage of pagesElements) {
        if (await titlePage.getText() == title) {
            found = true;
            await titlePage.click();
            break;
        }
    }

    expect(found).to.be.true;
});

When('I update pages with new title {string}', async function (newTitle) {
    let titleInput = await this.driver.$('textarea.gh-editor-title');
    await titleInput.setValue(newTitle);
    await this.driver.pause(1000);

    let saveButton =  await this.driver.$('button[class="gh-btn gh-btn-editor gh-editor-save-trigger green ember-view"]');
    saveButton.click();
    await this.driver.pause(1000);

});


When('I unpublish the pages', async function () {
    let publishButton = await this.driver.$('button[class="gh-btn gh-btn-editor darkgrey gh-unpublish-trigger"]')
    await publishButton.click();
    await this.driver.pause(1000);

    let publishButton2 = await this.driver.$('button[data-test-button="revert-to-draft"]');
    await publishButton2.click();
    await this.driver.pause(1000);

});


Then('I should see a pages with title {string}', async function (title) {
    let titleElements = await this.driver.$$('h3.gh-content-entry-title');

    let found = false;
    for (let titleElement of titleElements) {
        if (await titleElement.getText() == title) {
            found = true;

            /*let statusElement = await titleElement.$('..').$('p:nth-child(3)');
            statusElement = await statusElement.getText();
            expect(statusElement).to.equal(status);
            break;*/
            break;
        }
    }

    expect(found).to.be.true;
});


