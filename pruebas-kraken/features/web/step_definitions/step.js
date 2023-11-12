const { Given, When, Then } = require('@cucumber/cucumber');
const { assert, expect } = require('chai');

Given('I login to Ghost Admin with {kraken-string} user and {kraken-string} password', async function (username, password) {
    await this.driver.url('http://localhost:2368/ghost/#/signin');
    await this.driver.pause(2000);

    let userInput = await this.driver.$('#identification');
    await userInput.setValue(username);

    let passwordInput = await this.driver.$('#password');
    await passwordInput.setValue(password);

    let loginButton = await this.driver.$('button.login');
    await loginButton.click();

    await this.driver.pause(2000);
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
    
    let bodyInput = await this.driver.$('div[class="kg-prose"] > p');
    bodyInput.click();

    await this.driver.pause(1000);
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

Then('I should see a post with title {string}', async function (title) {
    // let titleElement = await this.driver.$('h3.gh-content-entry-title');
    // expect(await titleElement.getText()).to.equal(title);

    let titleElements = await this.driver.$$('h3.gh-content-entry-title');

    // console.log('titleElements', titleElements);

    let found = false;
    for (let titleElement of titleElements) {
        if (await titleElement.getText() == title) {
            found = true;
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
