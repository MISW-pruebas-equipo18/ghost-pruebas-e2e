const { defineConfig } = require("cypress");
const getCompareSnapshotsPlugin = require('cypress-visual-regression-resemble-js/dist/plugin');

module.exports = defineConfig({
  projectId: 'seuha9',
  chromeWebSecurity: false,
  env: {
    screenshotsFolder: './cypress/snapshots/actual',
    trashAssetsBeforeRuns: true,
    video: false
  },
  e2e: {
    baseUrl: 'http://localhost:2368/',
    baseUrlv2: 'https://grupo-miso.ghost.io/',
    //specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    specPattern: [
      "cypress/e2e/signin/invalid-data.cy.js",
      "cypress/e2e/signin/invalid-change-pass.cy.js",
      "cypress/e2e/signin/change-pass.cy.js",
      "cypress/e2e/signin/change-fullname-slug.cy.js",
      "cypress/e2e/post/public-edit-post.cy.js",
      "cypress/e2e/post/public-edit-delete-post.cy.js",
      "cypress/e2e/post/public-draft-post.cy.js",
      "cypress/e2e/post/public-and-unpublish-post.cy.js",
      "cypress/e2e/page/new-page.cy.js",
      "cypress/e2e/tags/add-tag.cy.js",
      "cypress/e2e/tags/delete-tag.cy.js",
      "cypress/e2e/tags/assign-tag.cy.js",
      "cypress/e2e/tags/edit-tag.cy.js",
      "cypress/e2e/staff/invite-staff-member.cy.js",
      "cypress/e2e/staff/verify-comments-staff-member.cy.js",
      "cypress/e2e/members/add-member.cy.js",
      "cypress/e2e/members/edit-member.cy.js"
    ],
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
      getCompareSnapshotsPlugin(on, config);
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


