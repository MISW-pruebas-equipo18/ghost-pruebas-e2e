const { Given, When, Then } = require('@cucumber/cucumber');
const { assert, expect } = require('chai');

When('I login with {kraken-string} user and {kraken-string} password', async function (username, password) {
    let userInput = await this.driver.$('#identification');
    await userInput.setValue(username);

    let passwordInput = await this.driver.$('#password');
    await passwordInput.setValue(password);

    let loginButton = await this.driver.$('button.login');
    await loginButton.click();
});
