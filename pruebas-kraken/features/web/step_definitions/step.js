const { Given, When, Then } = require('@cucumber/cucumber');
const { assert, expect } = require('chai');
const { faker } = require("@faker-js/faker");
const axios = require("axios");
//const csv = require("csv-parser");
//const fs = require('fs')
//const data = [];
const dataLogin = require('./Datapool/datosLogin.json');

const { pagesLogin } = require('./pages/loginPage');
const { pagesMenu } = require('./pages/menuPage');
const { pageTags } = require('./pages/tagsPage');
const { fpages } = require('./pages/page');
const { datosLogin } = require('./Datapool/datosLogin.json');

Given('I login to Ghost Admin with {kraken-string} user and {kraken-string} password and {kraken-string} url', async function (username, password, urlLogin) {
    await this.driver.url(urlLogin);

    await this.driver.pause(5000);

    let userInput = await this.driver.$(pagesLogin.userInput);
    await userInput.setValue(username);
    let passwordInput = await this.driver.$(pagesLogin.passwordInput);
    await passwordInput.setValue(password);

    let loginButton = await this.driver.$(pagesLogin.loginButton);
    await loginButton.click();
    await this.driver.pause(4000);

    let currentTitle = await this.driver.$(pagesMenu.tituloDashboard); 
    expect(await currentTitle.getText()).to.equal('Dashboard');
});

async function closeNotification() {
    try {
        await this.driver.pause(500);
        let notificationClose = await this.driver.$('button[class="gh-notification-close"]');
        await notificationClose.click();
    } catch (error) {
        console.log('No notification found');
    }
}

Then('I logout', async function () {
    let avatarButton = await this.driver.$(pagesMenu.avatarButton);
    await avatarButton.click();
    let signoutButton = await this.driver.$(pagesMenu.signoutButton);
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

When('I click on change password button', async function () {
    let changePasswordButton = await this.driver.$('//span[text()="Change password"]');
    await changePasswordButton.click();

    let oldPasswordInput = await this.driver.$('//label[text()="Old password"]')
    oldPasswordInput.scrollIntoView();
});

When('I go back to profile', async function () {
    let saveButton = await this.driver.$('//span[text()="Save & close"]');
    await saveButton.click();
});

When('I go back to dashboard view', async function () {
    let dashboardButton = await this.driver.$('button[data-testid="exit-settings"]');
    await dashboardButton.click();
});

When('I submit the password update form', async function () {
    let changePasswordButton = await this.driver.$('button[class="cursor-pointer bg-red text-white hover:bg-red-400 inline-flex items-center justify-center whitespace-nowrap rounded text-sm transition font-bold  h-[34px] px-4 "]');
    await changePasswordButton.click();
});

When('I update my password with empty fields', async function () {
    let oldPasswordInput = await this.driver.$('//label[text()="Old password"]').$('..').$('input');
    await oldPasswordInput.setValue('');

    let newPasswordInput = await this.driver.$('//label[text()="New password"]').$('..').$('input');
    await newPasswordInput.setValue('');

    let newPasswordInput2 = await this.driver.$('//label[text()="Verify password"]').$('..').$('input');
    await newPasswordInput2.setValue('');
});

Then('I should see an empty password fields error message', async function () {
    let errorElement = await this.driver.$('span[class="mt-1 inline-block text-xs text-red dark:text-red-500 order-3"]');
    expect(await errorElement.getText()).to.equal('Your current password is required to set a new one');
});

When('I update my password with a wrong old password', async function () {
    let oldPasswordInput = await this.driver.$('//label[text()="Old password"]').$('..').$('input');
    await oldPasswordInput.setValue('wrong');

    let newPasswordInput = await this.driver.$('//label[text()="New password"]').$('..').$('input');
    await newPasswordInput.setValue('2Xm51Ur{T;E2'); // 

    let newPasswordInput2 = await this.driver.$('//label[text()="Verify password"]').$('..').$('input');
    await newPasswordInput2.setValue('2Xm51Ur{T;E2');
});

Then('I should see a message that the old password is wrong', async function () {
    let errorElement = await this.driver.$('div[data-testid="toast-error"] > div');
    expect(await errorElement.getText()).to.equal('Your password is incorrect.');
});

When('I update my password with a new insecure password', async function () {
    let oldPasswordInput = await this.driver.$('//label[text()="Old password"]').$('..').$('input');
    await oldPasswordInput.setValue('mypass');

    let newPasswordInput = await this.driver.$('//label[text()="New password"]').$('..').$('input');
    await newPasswordInput.setValue('1234567890');

    let newPasswordInput2 = await this.driver.$('//label[text()="Verify password"]').$('..').$('input');
    await newPasswordInput2.setValue('1234567890');
});

Then('I should see a password security error message', async function () {
    let errorElement = await this.driver.$('span[class="mt-1 inline-block text-xs text-red dark:text-red-500 order-3"]');
    expect(await errorElement.getText()).to.equal('Sorry, you cannot use an insecure password.');
});

When('I update my password with a short new password', async function () {
    let oldPasswordInput = await this.driver.$('//label[text()="Old password"]').$('..').$('input');
    await oldPasswordInput.setValue('mypass');

    let newPasswordInput = await this.driver.$('//label[text()="New password"]').$('..').$('input');
    await newPasswordInput.setValue('wrong');

    let newPasswordInput2 = await this.driver.$('//label[text()="Verify password"]').$('..').$('input');
    await newPasswordInput2.setValue('wrong');
});

Then('I should see a password length error message', async function () {
    let errorElement = await this.driver.$('span[class="mt-1 inline-block text-xs text-red dark:text-red-500 order-3"]');
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

    await this.driver.pause(500);
    let bodyInput = await this.driver.$('p[data-koenig-dnd-droppable="true"]');
    bodyInput.click();

    await this.driver.pause(500);
    await bodyInput.setValue(body);
});

When('I write a random post with title {kraken-string}', async function (title) {
    let titleInput = await this.driver.$('textarea.gh-editor-title');
    await titleInput.setValue(title);

    await this.driver.pause(500);
    let bodyInput = await this.driver.$('p[data-koenig-dnd-droppable="true"]');
    bodyInput.click();

    await this.driver.pause(500);
    await bodyInput.setValue(faker.string.alphanumeric(255));
});


When('I write a pseudorandom post with title {kraken-string}', async function (title) {
    let titleInput = await this.driver.$('textarea.gh-editor-title');
    await titleInput.setValue(title);

    await this.driver.pause(500);
    let bodyInput = await this.driver.$('p[data-koenig-dnd-droppable="true"]');
    bodyInput.click();

    await this.driver.pause(500);
    await bodyInput.setValue(faker.lorem.paragraph());
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

    closeNotification()
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
    console.log(`Looking for element with title ${title}`)
    let titleElements = await this.driver.$$('h3.gh-content-entry-title');

    let found = false;
    for (let titleElement of titleElements) {
        if (await titleElement.getText() == title) {
            found = true;

            let statusElement = await titleElement.$('..').$('p:nth-child(3)');
            statusElement = await statusElement.getText();
            expect(statusElement).to.contain(status);
            break;
        }
    }

    expect(found).to.be.true;
});


Then('I should see a post with random title {kraken-string} and status {string}', async function (title, status) {
    console.log(`Looking for element with title ${title}`)
    let titleElements = await this.driver.$$('h3.gh-content-entry-title');

    let found = false;
    for (let titleElement of titleElements) {
        if (await titleElement.getText() == title) {
            found = true;

            let statusElement = await titleElement.$('..').$('p:nth-child(3)');
            statusElement = await statusElement.getText();
            expect(statusElement).to.contain(status);
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

Then ('I should not see a post with random title {kraken-string}', async function (title) {
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

When('I click on the post with random title {kraken-string}', async function (title) {
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
            await parent.click();
            this.driver.pause(500);

            let settings = await this.driver.$('button[title="Settings"]');
            await settings.click();

            let deleteButton = await this.driver.$('//span[text()=" Delete "]');
            await deleteButton.click();

            let confirmButton = await this.driver.$('button[class="gh-btn gh-btn-red gh-btn-icon ember-view"]');
            await confirmButton.click();
            break;
        }
    }

    expect(found).to.be.true;

    closeNotification()
});


When('I delete the post with random title {kraken-string}', async function (title) {
    let titleElements = await this.driver.$$('h3.gh-content-entry-title');

    let found = false;
    for (let titleElement of titleElements) {
        if (await titleElement.getText() == title) {
            found = true;
            let parent = await titleElement.$('../..');
            await parent.click();
            this.driver.pause(500);

            let settings = await this.driver.$('button[title="Settings"]');
            await settings.click();

            let deleteButton = await this.driver.$('//span[text()=" Delete "]');
            await deleteButton.click();

            let confirmButton = await this.driver.$('button[class="gh-btn gh-btn-red gh-btn-icon ember-view"]');
            await confirmButton.click();
            break;
        }
    }

    expect(found).to.be.true;

    closeNotification()
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

        closeNotification()
    }
});

When('I update my slug name with {string}', async function (slug) {
    let slugInput = await this.driver.$('input[class="peer z-[1] order-2 h-8 w-full bg-transparent px-3 py-1 text-sm placeholder:text-grey-500 dark:placeholder:text-grey-700 md:h-9 md:py-2 md:text-md dark:text-white rounded-md"]');
    await slugInput.setValue(slug);

    // let saveButton = await this.driver.$('button[data-test-save-button]');
    let saveButton = await this.driver.$('//span[text()="Save & close"]');
    await saveButton.click();
})

When('I update my slug name with random {kraken-string}', async function (slug) {
    let slugInput = await this.driver.$('input[class="peer z-[1] order-2 h-8 w-full bg-transparent px-3 py-1 text-sm placeholder:text-grey-500 dark:placeholder:text-grey-700 md:h-9 md:py-2 md:text-md dark:text-white rounded-md"]');
    await slugInput.setValue('');
    this.driver.pause(500);
    await slugInput.setValue(slug);

    // let saveButton = await this.driver.$('button[data-test-save-button]');
    let saveButton = await this.driver.$('//span[text()="Save & close"]');
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

When('I fill a new member with random name {kraken-string} and email {kraken-string}', async function (name, email) {
    let nameInput = await this.driver.$('input[name="name"]');
    await nameInput.setValue(name);

    let emailInput = await this.driver.$('input[name="email"]');
    await emailInput.setValue(email);
});

When('I fill a new member with random name empty and email {kraken-string}', async function (email) {
    let nameInput = await this.driver.$('input[name="name"]');
    await nameInput.setValue('');

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

Then('I should see a member with random name {kraken-string} and email {kraken-string}', async function (name, email) {
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

Then('I should see a member with random name {kraken-string}', async function (name) {
    let members = await this.driver.$$('table[class="gh-list"] > tbody > tr > a:first-child > div > div');

    let found = false;
    for (let member of members) {
        if (await member.$('h3').getText() == name) {
            found = true;
            break;
        }
    }

    expect(found).to.be.true;
});

Then('I should not see a member with random name {kraken-string}', async function (name) {
    let members = await this.driver.$$('table[class="gh-list"] > tbody > tr > a:first-child > div > div');

    let found = false;
    for (let member of members) {
        if (await member.$('h3').getText() == name) {
            found = true;
            break;
        }
    }

    expect(found).to.be.false;
});

/**************************************************************************************************** INICIO TAGS **/
When('I go to list tags view', async function () {
    let tagsLink = await this.driver.$(pagesMenu.tags); 
    await tagsLink.click();
});

When('I go to new tags view', async function () {
    let newtagsButton = await this.driver.$(pageTags.newButton);
    await newtagsButton.click();
});

When('I create a new tag with name {string} and description {string} and color {string}', async function (name, description, color) {
    let nameInput = await this.driver.$(pageTags.nameInput);
    await nameInput.setValue(name);

    let descriptionInput = await this.driver.$(pageTags.descriptionInput);
    descriptionInput.click();
    await this.driver.pause(1000);
    await descriptionInput.setValue(description);

    let saveButton =  await this.driver.$(pageTags.saveButton);
    saveButton.click();
    await this.driver.pause(1000);

});

When('I create a new random tag with name {kraken-string}', async function (name) {
    let nameInput = await this.driver.$(pageTags.nameInput);
    await nameInput.setValue(name);

    let descriptionInput = await this.driver.$(pageTags.descriptionInput);
    descriptionInput.click();
    await this.driver.pause(1000);
    await descriptionInput.setValue(faker.lorem.paragraph());

    let saveButton =  await this.driver.$(pageTags.saveButton);
    saveButton.click();
    await this.driver.pause(1000);
});


When('I create a new random tag with name {kraken-string} and invalid description', async function (name) {
    let nameInput = await this.driver.$(pageTags.nameInput);
    await nameInput.setValue(name);

    let descriptionInput = await this.driver.$(pageTags.descriptionInput);
    descriptionInput.click();
    await this.driver.pause(1000);
    await descriptionInput.setValue(faker.string.alphanumeric({length: {min: 501, max: 1000}}));

    let saveButton =  await this.driver.$(pageTags.saveButton);
    saveButton.click();
    await this.driver.pause(1000);
});

When('I create a new random tag with invalid name', async function () {
    let nameInput = await this.driver.$(pageTags.nameInput);
    await nameInput.setValue(faker.string.alphanumeric({length: {min: 192, max: 200}}));

    let descriptionInput = await this.driver.$(pageTags.descriptionInput);
    descriptionInput.click();
    await this.driver.pause(1000);
    await descriptionInput.setValue(faker.string.alphanumeric({length: {min: 10, max: 499}}));

    let saveButton =  await this.driver.$(pageTags.saveButton);
    saveButton.click();
    await this.driver.pause(1000);
});

Then('I validate tag with name {string}', async function (nameTag) {
    
    let tagsElements = await this.driver.$$(pageTags.tagsElements);

    let found = false;
    for (let name of tagsElements) {
        if (await name.getText() == nameTag) {
            found = true;
            break;
        }
    }

    expect(found).to.be.true;
});

When('I click on the tag with random name {kraken-string}', async function (nameTag) {
    let tagsElements = await this.driver.$$(pageTags.tagsElements);

    let found = false;
    for (let name of tagsElements) {
        if (await name.getText() == nameTag) {
            found = true;
            await name.click();
            break;
        }
    }

    expect(found).to.be.true;
});

Then('I validate random tag with name {kraken-string}', async function (nameTag) {
    
    let tagsElements = await this.driver.$$(pageTags.tagsElements);

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
    let tagElements = await this.driver.$$(pageTags.select);

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

When('I select the tag with random name {kraken-string}', async function (nameTag) {
    let tagElements = await this.driver.$$(pageTags.select);

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

When('I edit the tag with random name {kraken-string} and description {kraken-string}', async function (nameTag, description) {
    let nameInput = await this.driver.$(pageTags.nameInput);
    await nameInput.setValue(nameTag);

    let descriptionInput = await this.driver.$(pageTags.descriptionInput);
    descriptionInput.click();
    await this.driver.pause(1000);
    await descriptionInput.setValue(description);

    let saveButton =  await this.driver.$(pageTags.saveButton);
    saveButton.click();
    await this.driver.pause(1000);
});

// I edit the tag with random name "$string_2" and invalid description
When('I edit the tag with random name {kraken-string} and invalid description', async function (nameTag) {
    let nameInput = await this.driver.$(pageTags.nameInput);
    await nameInput.setValue(nameTag);

    let descriptionInput = await this.driver.$(pageTags.descriptionInput);
    descriptionInput.click();
    await this.driver.pause(1000);
    await descriptionInput.setValue(faker.string.alphanumeric({length: {min: 501, max: 1000}}));

    let saveButton =  await this.driver.$(pageTags.saveButton);
    saveButton.click();
    await this.driver.pause(1000);
});

When('I edit the tag with random invalid name', async function () {
    let nameInput = await this.driver.$(pageTags.nameInput);
    await nameInput.setValue(faker.string.alphanumeric({length: {min: 192, max: 200}}));

    let descriptionInput = await this.driver.$(pageTags.descriptionInput);
    descriptionInput.click();
    await this.driver.pause(1000);
    await descriptionInput.setValue(faker.string.alphanumeric({length: {min: 10, max: 499}}));

    let saveButton =  await this.driver.$(pageTags.saveButton);
    saveButton.click();
    await this.driver.pause(1000);
});



When('I update tag with new name {string}', async function (newName) {
    let nameInput = await this.driver.$(pageTags.nameInput);
    await nameInput.setValue(newName);
    await this.driver.pause(1000);

    let saveButton =  await this.driver.$(pageTags.saveButton);
    saveButton.click();
    await this.driver.pause(1000);

});

When('I delete the tag', async function () {
    
    let deleteButton =  await this.driver.$(pageTags.deleteButton);
    deleteButton.click();
    await this.driver.pause(1000);

    let confirmButton =  await this.driver.$(pageTags.confirmButton);
    confirmButton.click();
    await this.driver.pause(1000);

});


Then('I validate delete tag with name {string}', async function (nameTag) {
    
    let tagsElements = await this.driver.$$(pageTags.tagsElements);
    let found = false;

    
    for (let name of tagsElements) {
        if (await name.getText() == nameTag) {
            found = true;
            break;
        }
    }

    expect(found).to.be.false;
});

Then('I should not see a tag with random name {kraken-string}', async function (nameTag) {
    let tagsElements = await this.driver.$$(pageTags.tagsElements);
    found = false;

    for (let name of tagsElements) {
        if (await name.getText() == nameTag) {
            found = true;
            break;
        }
    }

    expect(found).to.be.false;
});

Then('I assign tag with name {string}', async function (nameTag) {
    let process = false;
    
    let settingButton =  await this.driver.$(fpages.pageSettings);
    settingButton.click();
    await this.driver.pause(1000);

    let tagInput = await this.driver.$(fpages.pageTags);
    await tagInput.setValue(nameTag)
    await this.driver.pause(1000);

    let tagOption = await this.driver.$(`//li[text()="${nameTag}"]`);
    await this.driver.pause(1000);
    tagOption.click();
    await this.driver.pause(1000);

    let saveButton =  await this.driver.$(fpages.saveButton);
    saveButton.click();
    found = true;
    await this.driver.pause(1000);

    expect(found).to.be.true;
});


/**************************************************************************************************** FIN TAGS **/

/**************************************************************************************************** INICIO MEMBER **/

When('I save the new member', async function() {
    let saveButton = await this.driver.$(pageTags.saveButton);
    await saveButton.click();
});

// Then I should see an invalid email message
Then('I should see an invalid email message', async function () {
    let errorElement = await this.driver.$('div[class="form-group max-width error"] > p');
    expect(await errorElement.getText()).to.equal('Invalid Email.');
});

// Then I should see an invalid description message
Then('I should see an invalid description message', async function () {
    let errorElement = await this.driver.$('div[class="form-group no-margin error"] > p[class="response"]');
    expect(await errorElement.getText()).to.equal('Description cannot be longer than 500 characters.');
});

Then('I should see an invalid name message', async function () {
    let errorElement = await this.driver.$('span[class="error"] > p[class="response"]');
    expect(await errorElement.getText()).to.equal('Tag names cannot be longer than 191 characters.');
});

// And I close the unsaved window
When('I close the unsaved window', async function () {
    let leaveButton = await this.driver.$('button[data-test-leave-button]');
    await leaveButton.click();
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

When('I click on the member with random name {kraken-string}', async function (name) {
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

When('I delete the member with random name {kraken-string}', async function (name) {
    let members = await this.driver.$$('table[class="gh-list"] > tbody > tr');

    let found = false;
    for (let member of members) {
        if (await member.$('h3').getText() == name) {
            found = true;
            await member.click();  
            break;
        }
    }

    expect(found).to.be.true;

    let configButton = await this.driver.$('button[data-test-button="member-actions"]');
    await configButton.click();

    let deleteButton = await this.driver.$('span[class="red"]');
    await deleteButton.click();

    let confirmButton = await this.driver.$('button[class="gh-btn gh-btn-red gh-btn-icon ember-view"]');
    await confirmButton.click();
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

When('I go to staff view', async function () {
    let settingsButton = await this.driver.$('a[href="#/settings/"]');
    await settingsButton.click();

    let staffButton = await this.driver.$('#staff');
    await staffButton.click();
});

When('I click on invite people button' , async function () {
    await this.driver.$('//span[text()="Invite people"]').click();
});

When('I fill the invite form for an admin user with email {string}', async function (email) {
    let emailInput = await this.driver.$('input[class="peer z-[1] order-2 h-8 w-full bg-transparent px-3 py-1 text-sm placeholder:text-grey-500 dark:placeholder:text-grey-700 md:h-9 md:py-2 md:text-md dark:text-white rounded-md"]');
    await emailInput.setValue(email);

    let adminOption = await this.driver.$('input[value="administrator"]');
    await adminOption.click();
});

When('I fill the invite form for an admin user with random email {kraken-string}', async function (email) {
    let emailInput = await this.driver.$('input[class="peer z-[1] order-2 h-8 w-full bg-transparent px-3 py-1 text-sm placeholder:text-grey-500 dark:placeholder:text-grey-700 md:h-9 md:py-2 md:text-md dark:text-white rounded-md"]');
    await emailInput.setValue(email);

    let adminOption = await this.driver.$('input[value="administrator"]');
    await adminOption.click();
});

When('I click on send invitation now button', async function () {
    let sendButton = await this.driver.$('//span[text()="Send invitation now"]');
    await sendButton.click();
});

When('I reload the page', async function () {
    await this.driver.refresh();
});

When('I click outside dialog', async function () {
    let title = await this.driver.$('div[class="sticky -top-px z-20 mt-[-55px] min-w-[260px] grow-0 bg-white pt-[52px] dark:bg-black tablet:fixed tablet:top-[8vmin] tablet:mt-0 tablet:basis-[260px] tablet:pt-0"]');
    await title.click();
});

When('I click on invited users button', async function () {
    await this.driver.$('#users-invited').click()
});

Then('I should see a new invited user with email {string}', async function (email) {
    let user = await this.driver.$(`//span[text()="${email}"]`);
    expect(user).to.not.be.null;
});


Then('I should see a new invited user with random email {kraken-string}', async function (email) {
    await this.driver.$('#users-invited').click()
    let users = await this.driver.$$('h3[data-test-email]');
    let found = false;

    for (let user of users) {
        if (await user.getText() == email) {
            found = true;
            break;
        }
    }

    expect(found).to.be.true;
});

When('I revoke all invitations', async function () {
    let users = await this.driver.$$('a[data-test-revoke-button]');

    for (let user of users) {
        await user.click();

        await this.driver.pause(500);

        let notificationClose = await this.driver.$('button[data-test-button="close-notification"]');
        await notificationClose.click();
    }
});

When('I click on view owner profile button', async function () {
    let ownerButton = await this.driver.$('span[data-test-role-name]');
    await ownerButton.click();
});

Then('I should see that the comments are enabled', async function () {
    let commentsCheckbox = await this.driver.$('input[data-test-checkbox="comment-notifications"]');
    expect(await commentsCheckbox.isSelected()).to.be.true;
});

/**************************************************************************************************** FIN MEMBER **/


/**************************************************************************************************** INICIO PAGES **/
When('I go to list pages view', async function () {
    let pagesLink = await this.driver.$(pagesMenu.pagesLink); 
    await pagesLink.click();
});

When('I go back to editor pages', async function () {
    let pagesLink1 = await this.driver.$(fpages.btnEditor) 
    await pagesLink1.click();
});


When('I go back to list pages view', async function () {
    let pagesLink2 = await this.driver.$(fpages.list)
    await pagesLink2.click();
});


When('I go to new pages view', async function () {
    let newPagesButton = await this.driver.$(fpages.newButton);
    await newPagesButton.click();
});

When('I create new pages with title {string} and body {string}', async function (title, body) {
    let titleInput = await this.driver.$(fpages.titleInput);
    await titleInput.setValue(title);
    await this.driver.pause(1000);

    let bodyInput = await this.driver.$(fpages.bodyInput);
    bodyInput.click();

    await this.driver.pause(1000);
    await bodyInput.setValue(body);
});

When('I create a random page with title {kraken-string}', async function (title) {
    let titleInput = await this.driver.$('textarea.gh-editor-title');
    await titleInput.setValue(title);

    await this.driver.pause(500);
    let bodyInput = await this.driver.$('p[data-koenig-dnd-droppable="true"]');
    bodyInput.click();

    await this.driver.pause(500);
    await bodyInput.setValue(faker.lorem.paragraph());
});

When('I delete the page with random title {kraken-string}', async function (title) {
    let titleElements = await this.driver.$$('h3.gh-content-entry-title');

    let found = false;
    for (let titleElement of titleElements) {
        if (await titleElement.getText() == title) {
            found = true;
            let parent = await titleElement.$('../..');
            await parent.click();
            this.driver.pause(500);

            let settings = await this.driver.$('button[title="Settings"]');
            await settings.click();

            let deleteButton = await this.driver.$('//span[text()=" Delete "]');
            await deleteButton.click();

            let confirmButton = await this.driver.$('button[class="gh-btn gh-btn-red gh-btn-icon ember-view"]');
            await confirmButton.click();
            break;
        }
    }

    expect(found).to.be.true;

    closeNotification()
});


When('I publish the pages', async function () {
    let publishButton = await this.driver.$(fpages.publishButton)
    await publishButton.click();
    await this.driver.pause(1000);

    let publishButton2 = await this.driver.$(fpages.continueButton);
    await publishButton2.click();
    await this.driver.pause(1000);

    let publishButton3 = await this.driver.$(fpages.confirmButton);
    await publishButton3.click();
    await this.driver.pause(1000);
});


Then('I validate pages with name {string}', async function (title) {
    
    let pagesElements = await this.driver.$$(fpages.pagesElements);

    let found = false;
    for (let titlePage of pagesElements) {
        if (await titlePage.getText() == title) {
            found = true;
            break;
        }
    }

    expect(found).to.be.true;
});

Then('I should see a page with random title {kraken-string} and status {string}', async function (title, status) {
    console.log(`Looking for element with title ${title}`)
    let titleElements = await this.driver.$$('h3.gh-content-entry-title');

    let found = false;
    for (let titleElement of titleElements) {
        if (await titleElement.getText() == title) {
            found = true;

            let statusElement = await titleElement.$('..').$('p:nth-child(3)');
            statusElement = await statusElement.getText();
            expect(statusElement).to.contain(status);
            break;
        }
    }

    expect(found).to.be.true;
});

Then('I should not see a page with random title {kraken-string}', async function (title) {
    console.log(`Looking for element with title ${title}`)
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

When('I selected pages with name {string}', async function (title) {
    let pagesElements = await this.driver.$$(fpages.pagesElements);

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

When('I click on the page with random title {kraken-string}', async function (title) {
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

When('I update pages with new title {string}', async function (newTitle) {
    let titleInput = await this.driver.$(fpages.titleInput);
    await titleInput.setValue(newTitle);
    await this.driver.pause(1000);

    let saveButton =  await this.driver.$(fpages.saveButton);
    saveButton.click();
    await this.driver.pause(1000);

});


When('I unpublish the pages', async function () {
    let publishButton = await this.driver.$(fpages.unpublishButton)
    await publishButton.click();
    await this.driver.pause(1000);

    let publishButton2 = await this.driver.$(fpages.draftButton);
    await publishButton2.click();
    await this.driver.pause(1000);

});


Then('I should see a pages with title {string}', async function (title) {
    let titleElements = await this.driver.$$(fpages.pagesElements);

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

When('I unpublish the post', async function () {
    let unpublishButton = await this.driver.$('button[data-test-button="update-flow"]');
    await unpublishButton.click();

    let unpublishButton2 = await this.driver.$('button[class="gh-revert-to-draft');
    await unpublishButton2.click();
});

/**************************************************************************************************** escenarios PSEUDOALEATORIOS **/

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

When('I create new pages with Datapool pseudoAleatorio limitesuperior', async function () {
    
    let indice = getRandomInt(11);

    const response = await axios.get(
        "https://my.api.mockaroo.com/titulos_pages_tags.json?key=ecc92df0"
      );
    const datapoolMockaroo = response.data;
    let Titulo = datapoolMockaroo[indice].tituloLimiteSuperiorMasUno;
    let descripcion = faker.random.alpha(25); 
    
    let titleInput = await this.driver.$(fpages.titleInput);
    await titleInput.setValue(Titulo);
    await this.driver.pause(1000);

    let bodyInput = await this.driver.$(fpages.bodyInput);
    bodyInput.click();
    await this.driver.pause(1000);
    await bodyInput.setValue(descripcion);
    await this.driver.pause(1000);
});

Then('I publish the pages error', async function () {
    let haveError = false;
    let publishButton = await this.driver.$$(fpages.publishButton);
    
    if (publishButton > 0){
        await publishButton.click();
        await this.driver.pause(1000);
        
        let alerta = await this.driver.$(fpages.MsjError)
        
        if (await alerta.getText().contain("Title cannot be longer than 255 characters") ) {
            haveError = true;
        }
    
    }
    else
    {
        haveError = true;

    }
        
    expect(haveError).to.be.true
    
});


When('I cancel pages', async function () {
    let pagesLink2 = await this.driver.$(fpages.list)
    await pagesLink2.click();
    await this.driver.pause(1000);
    let leavePage = await this.driver.$(fpages.leaveButton)
    await leavePage.click();
    
});



When('I write a post with Datapol Aleatorio', async function (title, body) {
    let titleInput = await this.driver.$('textarea.gh-editor-title');
    await titleInput.setValue(title);

    // Wait 1 second
    
    await this.driver.pause(500);
    let bodyInput = await this.driver.$('p[data-koenig-dnd-droppable="true"]');
    bodyInput.click();

    await this.driver.pause(500);
    await bodyInput.setValue(body);
});

When('I create new pages with Datapool pseudoAleatorio limitesuperiorAnt', async function () {
    
    let indice = getRandomInt(11);

    const response = await axios.get(
        "https://my.api.mockaroo.com/titulos_pages_tags.json?key=ecc92df0"
      );
    const datapoolMockaroo = response.data;
    let Titulo = datapoolMockaroo[indice].tituloLimiteSuperiorMenosUno;
    let descripcion = faker.random.alpha(25); 
    
    let titleInput = await this.driver.$(fpages.titleInput);
    await titleInput.setValue(Titulo);
    await this.driver.pause(1000);

    let bodyInput = await this.driver.$(fpages.bodyInput);
    bodyInput.click();
    await this.driver.pause(1000);
    await bodyInput.setValue(descripcion);
    await this.driver.pause(1000);
});

Then('I publish the pages valid', async function () {
    let processComplete = false;
    
    try {
        let publishButton = await this.driver.$(fpages.publishButton)
        await publishButton.click();
        await this.driver.pause(1000);
    
        let publishButton2 = await this.driver.$(fpages.continueButton);
        await publishButton2.click();
        await this.driver.pause(1000);
    
        let publishButton3 = await this.driver.$(fpages.confirmButton);
        await publishButton3.click();
        await this.driver.pause(1000);
        
        processComplete = true;
    } catch (error) {
        processComplete = false;
    }
    
    expect(processComplete).to.be.true; 
   
});

When('I create new pages with Datapool pseudoAleatorio valido', async function () {
    
    let indice = getRandomInt(11);

    const response = await axios.get(
        "https://my.api.mockaroo.com/titulos_pages_tags.json?key=ecc92df0"
      );
    const datapoolMockaroo = response.data;
    let Titulo = datapoolMockaroo[indice].tituloValido;
    let descripcion = faker.random.alpha(25); 
    
    let titleInput = await this.driver.$(fpages.titleInput);
    await titleInput.setValue(Titulo);
    await this.driver.pause(1000);

    let bodyInput = await this.driver.$(fpages.bodyInput);
    bodyInput.click();
    await this.driver.pause(1000);
    await bodyInput.setValue(descripcion);
    await this.driver.pause(1000);
});

When("I click firts pages", async function () {
    let element = await this.driver.$(fpages.firstPages);
    return await element.click();
  });

Then('I update the pages error', async function () {
    let haveError = false;
    
    let saveButton =  await this.driver.$(fpages.saveButton);
    saveButton.click();
    await this.driver.pause(1000);

    let alerta = await this.driver.$('div.gh-alert-content');
        
    if (await alerta.getText() == "Update failed: Title cannot be longer than 255 characters."){
        haveError = true;
    }

    expect(haveError).to.be.true
    
});

Then('I publish update pages valid', async function (){
    let processComplete = false;
    
    try {
        let saveButton =  await this.driver.$(fpages.saveButton);
        saveButton.click();
        await this.driver.pause(1000);
        processComplete = true;
    } catch (error) {
        processComplete = false;
    }
    
    expect(processComplete).to.be.true; 

});

When('I create new tag with Datapool pseudoAleatorio valido', async function () {
    
    let indice = getRandomInt(11);

    const response = await axios.get(
        "https://my.api.mockaroo.com/titulos_pages_tags.json?key=ecc92df0"
      );
    const datapoolMockaroo = response.data;
    let nombre = datapoolMockaroo[indice].tagValido;
    let descripcion = faker.random.alpha(25); 
    
    let nameInput = await this.driver.$(pageTags.nameInput);
    await nameInput.setValue(nombre);
    await this.driver.pause(1000);

    let descriptionInput = await this.driver.$(pageTags.descriptionInput);
    descriptionInput.click();
    await this.driver.pause(1000);
    await descriptionInput.setValue(descripcion);
    await this.driver.pause(1000);
});

Then('I create tag valid', async function () {
    let processComplete = false;
    
    try {
        let saveButton =  await this.driver.$(pageTags.saveButton);
        saveButton.click();
        await this.driver.pause(1000);
    
        processComplete = true;
    } catch (error) {
        processComplete = false;
    }
    
    expect(processComplete).to.be.true; 
   
});

When('I create new tag with Datapool pseudoAleatorio limitesuperiorAnt', async function () {
    
    let indice = getRandomInt(11);

    const response = await axios.get(
        "https://my.api.mockaroo.com/titulos_pages_tags.json?key=ecc92df0"
      );
    const datapoolMockaroo = response.data;
    let nombre = datapoolMockaroo[indice].tagLimiteSuperiorMenosUno;
    let descripcion = faker.random.alpha(25); 
    
    let nameInput = await this.driver.$(pageTags.nameInput);
    await nameInput.setValue(nombre);
    await this.driver.pause(1000);

    let descriptionInput = await this.driver.$(pageTags.descriptionInput);
    descriptionInput.click();
    await this.driver.pause(1000);
    await descriptionInput.setValue(descripcion);
    await this.driver.pause(1000);
});

When('I create new tag with Datapool pseudoAleatorio limitesuperior', async function () {
    
    let indice = getRandomInt(11);

    const response = await axios.get(
        "https://my.api.mockaroo.com/titulos_pages_tags.json?key=ecc92df0"
      );
    const datapoolMockaroo = response.data;
    let nombre = datapoolMockaroo[indice].tagLimiteSuperiorMasUno;
    let descripcion = faker.random.alpha(25); 
    
    let nameInput = await this.driver.$(pageTags.nameInput);
    await nameInput.setValue(nombre);
    await this.driver.pause(1000);

    let descriptionInput = await this.driver.$(pageTags.descriptionInput);
    descriptionInput.click();
    await this.driver.pause(1000);
    await descriptionInput.setValue(descripcion);
    await this.driver.pause(1000);
});


Then('I publish tag error', async function () {
    let haveError = false;
    let saveButton =  await this.driver.$(pageTags.saveButton);
    saveButton.click();
    await this.driver.pause(1000);
    
    let retryButton = await this.driver.$$(pageTags.saveButton);
    if (retryButton == 0){
        haveError = true;
    }

    expect(haveError).to.be.true
    
});

When('I cancel tag', async function () {
    let tagLink2 = await this.driver.$(pagesMenu.tags)
    await tagLink2.click();
    await this.driver.pause(1000);
    let leaveTag = await this.driver.$(pageTags.leaveButton)
    await leaveTag.click();
    
});


When('I create new tag descripcion with Datapool pseudoAleatorio valido', async function () {
    
    let indice = getRandomInt(11);

    const response = await axios.get(
        "https://my.api.mockaroo.com/titulos_pages_tags.json?key=ecc92df0"
      );
    const datapoolMockaroo = response.data;
    let nombre = faker.random.alpha(25); 
    let descripcion = datapoolMockaroo[indice].Descripciontag;
    
    let nameInput = await this.driver.$(pageTags.nameInput);
    await nameInput.setValue(nombre);
    await this.driver.pause(1000);

    let descriptionInput = await this.driver.$(pageTags.descriptionInput);
    descriptionInput.click();
    await this.driver.pause(1000);
    await descriptionInput.setValue(descripcion);
    await this.driver.pause(1000);
});

When('I create new tag descripcion with Datapool pseudoAleatorio limitesuperiorAnt', async function () {
    
    let indice = getRandomInt(11);

    const response = await axios.get(
        "https://my.api.mockaroo.com/titulos_pages_tags.json?key=ecc92df0"
      );
    const datapoolMockaroo = response.data;
    let nombre = faker.random.alpha(25); 
    let descripcion = datapoolMockaroo[indice].DestagLimiteSuperiorMenosUno;
    
    let nameInput = await this.driver.$(pageTags.nameInput);
    await nameInput.setValue(nombre);
    await this.driver.pause(1000);

    let descriptionInput = await this.driver.$(pageTags.descriptionInput);
    descriptionInput.click();
    await this.driver.pause(1000);
    await descriptionInput.setValue(descripcion);
    await this.driver.pause(1000);
});

When('I create new tag descripcion with Datapool pseudoAleatorio limitesuperior', async function () {
    
    let indice = getRandomInt(11);

    const response = await axios.get(
        "https://my.api.mockaroo.com/titulos_pages_tags.json?key=ecc92df0"
      );
    const datapoolMockaroo = response.data;
    let nombre = faker.random.alpha(25); 
    let descripcion = datapoolMockaroo[indice].DestagLimiteSuperiorMasUno;
    
    let nameInput = await this.driver.$(pageTags.nameInput);
    await nameInput.setValue(nombre);
    await this.driver.pause(1000);

    let descriptionInput = await this.driver.$(pageTags.descriptionInput);
    descriptionInput.click();
    await this.driver.pause(1000);
    await descriptionInput.setValue(descripcion);
    await this.driver.pause(1000);
});

When("I click firts tag", async function () {
    let element = await this.driver.$(pageTags.firstTags);
    return await element.click();
  });

/**************************************************************************************************** escenarios APRIORI **/
Given('I login to Ghost from data CSV and {kraken-string} url', async function (urlLogin) {
    let loginError;
    
    await this.driver.url(urlLogin);
    await this.driver.pause(5000);

    let indice = getRandomInt(21);

    let idlogin = dataLogin[indice].id
    let username = dataLogin[indice].email;
    let password = dataLogin[indice].password;

    let userInput = await this.driver.$(pagesLogin.userInput);
    await userInput.setValue(username);
    let passwordInput = await this.driver.$(pagesLogin.passwordInput);
    await passwordInput.setValue(password);

    let loginButton = await this.driver.$(pagesLogin.loginButton);
    await loginButton.click();
    await this.driver.pause(4000);

    let currentTitle = await this.driver.$(pagesMenu.tituloDashboard); 
    
    
    try {
        if(await currentTitle.getText() == "Dashboard") 
        {
            if(idlogin == 20)
            {
                let avatarButton = await this.driver.$(pagesMenu.avatarButton);
                await avatarButton.click();
                let signoutButton = await this.driver.$(pagesMenu.signoutButton);
                await this.driver.pause(2000);
                await signoutButton.click();
                loginError = false
            }
            else
            {
                loginError = true;
            }
        }     
    } catch (error) {
        loginError = false;
    }
    
    

    expect(loginError).to.be,false; 
    
    
});





  




