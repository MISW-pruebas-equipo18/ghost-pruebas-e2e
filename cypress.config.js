const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:2368/"',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    user:'eg.romeror1@uniandes.edu.co',
    passw:'GioR2023@@',
    newPassw:'GioR2023@@',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      "baseUrl" : "http://localhost:2368/",
    }    
  },
});