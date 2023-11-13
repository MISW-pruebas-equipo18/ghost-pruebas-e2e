const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity: false,
  e2e: {
    baseUrl: 'http://localhost:2368/',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    testIsolation: false,
    user:'eg.romeror1@uniandes.edu.co',
    passw:'GioR2023@@',
    newPassw:'GioR2023@@',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }, 
    env: {
      "base_url" : "http://localhost:2368/",
      "user":'dejahvuuu@gmail.com',
      "passw":'Gu4c4m4y0.2023',
      "url_staff":'http://localhost:2368/ghost/#/settings/staff',  
      "url_members":'http://localhost:2368/ghost/#/members',
      "url_tags":'http://localhost:2368/ghost/#/tags'
    }    
  },
});