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

When('I go to profile view', async function () {
    let avatarButton = await this.driver.$('div[class="pe-all"] > div:first-child');
    await avatarButton.click();

    await this.driver.pause(1000);
    let profileButton = await this.driver.$('a[data-test-nav="user-profile"]');
    await profileButton.click();
});

When('I submit the password update form', async function () {
    let submitButton = await this.driver.$('fieldset[class="user-details-form"] > div:last-child > button');
    await submitButton.click();
});

When('I update my password with empty fields', async function () {
    let oldPasswordInput = await this.driver.$('#user-password-old');
    await oldPasswordInput.setValue('');

    let newPasswordInput = await this.driver.$('#user-password-new');
    await newPasswordInput.setValue('');

    let newPasswordInput2 = await this.driver.$('#user-new-password-verification');
    await newPasswordInput2.setValue('');
});

Then('I should see an empty password fields error message', async function () {
    let errorElement = await this.driver.$('p[data-test-error="user-old-pass"]');
    expect(await errorElement.getText()).to.equal('Your current password is required to set a new one');
    
    let errorElement2 = await this.driver.$('p[data-test-error="user-new-pass"]');
    expect(await errorElement2.getText()).to.equal('Sorry, passwords can\'t be blank');   
});

When('I update my password with a wrong old password', async function () {
    let oldPasswordInput = await this.driver.$('#user-password-old');
    await oldPasswordInput.setValue('wrong');

    let newPasswordInput = await this.driver.$('#user-password-new');
    await newPasswordInput.setValue('2Xm51Ur{T;E2'); // 

    let newPasswordInput2 = await this.driver.$('#user-new-password-verification');
    await newPasswordInput2.setValue('2Xm51Ur{T;E2');
});

Then('I should see a message that the old password is wrong', async function () {
    let errorElement = await this.driver.$('div[class="gh-alert-content"]');
    expect(await errorElement.getText()).to.equal('Your password is incorrect.');
});

When('I update my password with a new insecure password', async function () {
    let oldPasswordInput = await this.driver.$('#user-password-old');
    await oldPasswordInput.setValue('mypass');

    let newPasswordInput = await this.driver.$('#user-password-new');
    await newPasswordInput.setValue('1234567890');

    let newPasswordInput2 = await this.driver.$('#user-new-password-verification');
    await newPasswordInput2.setValue('1234567890');
});

Then('I should see a password security error message', async function () {
    let errorElement = await this.driver.$('p[data-test-error="user-new-pass"]');
    expect(await errorElement.getText()).to.equal('Sorry, you cannot use an insecure password.');
});

When('I update my password with a short new password', async function () {
    let oldPasswordInput = await this.driver.$('#user-password-old');
    await oldPasswordInput.setValue('mypass');

    let newPasswordInput = await this.driver.$('#user-password-new');
    await newPasswordInput.setValue('wrong');

    let newPasswordInput2 = await this.driver.$('#user-new-password-verification');
    await newPasswordInput2.setValue('wrong');
});

Then('I should see a password length error message', async function () {
    let errorElement = await this.driver.$('p[data-test-error="user-new-pass"]');
    expect(await errorElement.getText()).to.equal('Password must be at least 10 characters long.');
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

Then('I should see {int} posts', async function (count) {
    let titleElements = await this.driver.$$('h3.gh-content-entry-title');
    expect(titleElements.length).to.equal(count);
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

When('I update my slug name with {string}', async function (slug) {
    let slugInput = await this.driver.$('input[id="user-slug"]');
    await slugInput.setValue(slug);

    let saveButton = await this.driver.$('button[data-test-save-button]');
    await saveButton.click();
})

Then('I should see that the profile URL ends with {string}', async function (slug) {
    let url = await this.driver.getUrl();
    expect(url.endsWith(slug)).to.be.true;
});

When('I go to members view', async function () {
    let membersPage = await this.driver.$('a[href="#/members/"]');
    await membersPage.click();
});

When('I click on new member button', async function () {
    let newMemberButton = await this.driver.$('a[href="#/members/new/"]');
    await newMemberButton.click();
});

When('I fill a new member with name {string} and email {string}', async function (name, email) {
    let nameInput = await this.driver.$('input[name="name"]');
    await nameInput.setValue(name);

    let emailInput = await this.driver.$('input[name="email"]');
    await emailInput.setValue(email);
});

Then('I should see a member with name {string} and email {string}', async function (name, email) {
    let members = await this.driver.$$('table[class="gh-list"] > tbody > tr > a:first-child > div > div');

    let found = false;
    for (let member of members) {
        if (await member.$('h3').getText() == name) {
            let emailElement = await member.$('p');
            emailElement = await emailElement.getText();
            expect(emailElement).to.equal(email);

            found = true;
            break;
        }
    }

    expect(found).to.be.true;
});

When('I save the new member', async function() {
    let saveButton = await this.driver.$('button[data-test-button="save"]');
    await saveButton.click();
});

When('I click on the member with name {string}', async function (name) {
    let members = await this.driver.$$('table[class="gh-list"] > tbody > tr > a:first-child > div > div');

    let found = false;
    for (let member of members) {
        if (await member.$('h3').getText() == name) {
            found = true;
            await member.click();  
            break;
        }
    }

    expect(found).to.be.true;
});

When('I delete all remaining members', async function () {
    let members = await this.driver.$$('table[class="gh-list"] > tbody > tr');

    let found = false;
    for (let member of members) {
        found = true;
        await member.click();  

        let configButton = await this.driver.$('button[data-test-button="member-actions"]');
        await configButton.click();

        let deleteButton = await this.driver.$('span[class="red"]');
        await deleteButton.click();

        let confirmButton = await this.driver.$('button[class="gh-btn gh-btn-red gh-btn-icon ember-view"]');
        await confirmButton.click();
    }
});
