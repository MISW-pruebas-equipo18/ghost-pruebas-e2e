const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'seuha9',
  chromeWebSecurity: false,
  e2e: {
    baseUrl: 'http://localhost:2368/',
    baseUrlv2: 'https://grupo-miso.ghost.io/',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    user:'eg.romeror1@uniandes.edu.co',
    passw:'GioR2023@@',
    newPassw:'GioR2023**',
    userv2:'albertogalvis@protonmail.com',
    passwv2:'Gu4c4m4y0.2024',
    newPasswv2:'Pruebas123*',
    uservisitor:'dejahvuuu@gmail.com',
    passwordvisitor: 'Gu4c4m4y0.2023',
    testIsolation: false,
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