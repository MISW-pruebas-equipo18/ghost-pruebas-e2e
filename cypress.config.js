const { defineConfig } = require("cypress");
const getCompareSnapshotsPlugin = require('cypress-visual-regression-resemble-js/dist/plugin');

module.exports = defineConfig({
  projectId: 'seuha9',
  chromeWebSecurity: false,
  env: {
    screenshotsFolder: './cypress/snapshots/actual',
    trashAssetsBeforeRuns: true,
    video: false,
    base_url : "http://localhost:3002/",
    user : 'dejahvuuu@gmail.com',
    passw:'Gu4c4m4y0.2023',
    url_staff:'ghost/#/settings/staff',
    url_settings:'ghost/#/settings',  
    url_members:'ghost/#/members',
    url_tags:'ghost/#/tags',
    url_invite:'/invite',
    url_dashboard:'ghost/#/dashboard',    
  },

  e2e: {
    baseUrl: 'http://localhost:3002/',
    baseUrlv2: 'http://localhost:3002/',
    //specPattern: 'cypress/e2e/Ghost-5.27.0/**/*.cy.{js,jsx,ts,tsx}',
    user:'eg.romeror1@uniandes.edu.co',
    passw:'GioR2023@@',
    newPassw:'GioR2023**',
    userv2:'albertogalvis@protonmail.com',
    passwv2:'Gu4c4m4y0.2024',
    newPasswv2:'Pruebas123*',
    uservisitor:'dejahvuuu@gmail.com',
    passwordvisitor: 'Gu4c4m4y0.2023',
    testIsolation: false,
    screenShots: true,
    specPattern: [
      'cypress/e2e/Test-apriori/members/add/flujo-normal.cy.js',
      'cypress/e2e/Test-apriori/members/add/correo-sin-formato.cy.js',
      'cypress/e2e/Test-apriori/members/add/campo-vacio-nombre.cy.js',
      'cypress/e2e/Test-apriori/members/add/campo-vacio-email.cy.js',
      'cypress/e2e/Test-apriori/members/edit/edit-name.cy.js',
      'cypress/e2e/Test-apriori/members/edit/flujo-normal.cy.js',
      'cypress/e2e/Test-apriori/members/edit/incorrect-format-email.cy.js',
      /*
      'cypress/e2e/Test-apriori/post/**',
      'cypress/e2e/Test-apriori/page/**',
      'cypress/e2e/Test-apriori/tag/**',
      'cypress/e2e/Test-apriori/members/**',
      'cypress/e2e/Test-aleatorio/members/**',
      'cypress/e2e/Test-apriori/staff/**',
      'cypress/e2e/Test-apriori/settings/**',
      'cypress/e2e/Test-aleatorio/members/**',
      'cypress/e2e/Test-aleatorio/staff/**',
      'cypress/e2e/Test-apriori/signin/**',
      /*'cypress/e2e/Test-apriori/members/add/flujo-normal.cy.js',
      'cypress/e2e/Test-apriori/members/add/correo-sin-formato.cy.js',
      'cypress/e2e/Test-apriori/members/add/campo-vacio-nombre.cy.js',
      'cypress/e2e/Test-apriori/members/add/campo-vacio-email.cy.js',
      'cypress/e2e/Test-apriori/members/edit/edit-name.cy.js',
      'cypress/e2e/Test-apriori/members/edit/flujo-normal.cy.js',
      'cypress/e2e/Test-apriori/members/edit/incorrect-format-email.cy.js',
      'cypress/e2e/Test-apriori/staff/invite/campo-vacio.cy.js',
      'cypress/e2e/Test-apriori/settings/code-injection/flujo-normal.cy.js',
      'cypress/e2e/Test-apriori/settings/language/flujo-normal.cy.js',
      'cypress/e2e/Test-apriori/settings/title-description/flujo-normal.cy.js',
      'cypress/e2e/Test-apriori/settings/recommendations/flujo-normal.cy.js',
      'cypress/e2e/Test-aleatorio/members/add/flujo-normal.cy.js',
      'cypress/e2e/Test-aleatorio/members/edit/flujo-normal.cy.js',
      'cypress/e2e/Test-aleatorio/staff/invite/flujo-normal.cy.js',
      'cypress/e2e/Test-apriori/members/add/correo-sin-formato.cy.js',
      'cypress/e2e/Test-apriori/members/add/flujo-normal.cy.js',
      'cypress/e2e/Test-apriori/members/add/campo-vacio.cy.js',
      'cypress/e2e/Test-apriori/members/add/campos-vacios.cy.js',
      'cypress/e2e/Test-apriori/members/edit/flujo-normal.cy.js',
      'cypress/e2e/Test-apriori/members/edit/edit-name.cy.js',
      'cypress/e2e/Test-apriori/members/edit/edit-email.cy.js',
      'cypress/e2e/Test-apriori/staff/invite/campo-vacio.cy.js',
      'cypress/e2e/Test-apriori/settings/code-injection/flujo-normal.cy.js',
      'cypress/e2e/Test-apriori/settings/language/flujo-normal.cy.js',
      'cypress/e2e/Test-apriori/settings/recommendations/flujo-normal.cy.js',
      'cypress/e2e/Test-apriori/settings/title-description/flujo-normal.cy.js',
      'cypress/e2e/Test-aleatorio/members/add/flujo-normal.cy.js',
      'cypress/e2e/Test-aleatorio/members/edit/flujo-normal.cy.js',
      'cypress/e2e/Test-aleatorio/staff/invite/flujo-normal.cy.js',*/
      /*"cypress/e2e/Ghost-5.27.0/signin/invalid-data.cy.js",
      "cypress/e2e/Ghost-5.27.0/signin/invalid-change-pass.cy.js",
      "cypress/e2e/Ghost-5.27.0/signin/change-pass.cy.js",
      "cypress/e2e/Ghost-5.27.0/signin/change-fullname-slug.cy.js",
      "cypress/e2e/Ghost-5.27.0/post/public-edit-post.cy.js",
      "cypress/e2e/Ghost-5.27.0/post/public-edit-delete-post.cy.js",
      "cypress/e2e/Ghost-5.27.0/post/public-draft-post.cy.js",
      "cypress/e2e/Ghost-5.27.0/post/public-and-unpublish-post.cy.js",
      "cypress/e2e/Ghost-5.27.0/page/new-page.cy.js",
      "cypress/e2e/Ghost-5.27.0/tags/add-tag.cy.js",
      "cypress/e2e/Ghost-5.27.0/tags/delete-tag.cy.js",
      "cypress/e2e/Ghost-5.27.0/tags/assign-tag.cy.js",
      // "cypress/e2e/Ghost-5.27.0/tags/edit-tag.cy.js",
      "cypress/e2e/Ghost-5.27.0/staff/invite-staff-member.cy.js",
      "cypress/e2e/Ghost-5.27.0/staff/verify-comments-staff-member.cy.js",
      "cypress/e2e/Ghost-5.27.0/members/add-member.cy.js",
      "cypress/e2e/Ghost-5.27.0/members/edit-member.cy.js",
      "cypress/e2e/Ghost-5.73.2/signin/invalid-data.cy.js",
      "cypress/e2e/Ghost-5.73.2/signin/invalid-change-pass.cy.js",
      "cypress/e2e/Ghost-5.73.2/signin/change-pass.cy.js",
      "cypress/e2e/Ghost-5.73.2/signin/change-fullname-slug.cy.js",
      "cypress/e2e/Ghost-5.73.2/post/public-edit-post.cy.js",
      "cypress/e2e/Ghost-5.73.2/post/public-edit-delete-post.cy.js",
      "cypress/e2e/Ghost-5.73.2/post/public-draft-post.cy.js",
      "cypress/e2e/Ghost-5.73.2/post/public-and-unpublish-post.cy.js",
      "cypress/e2e/Ghost-5.73.2/page/new-page.cy.js",
      "cypress/e2e/Ghost-5.73.2/tags/add-tag.cy.js",
      "cypress/e2e/Ghost-5.73.2/tags/delete-tag.cy.js",
      "cypress/e2e/Ghost-5.73.2/tags/assign-tag.cy.js",
      // "cypress/e2e/Ghost-5.73.2/tags/edit-tag.cy.js",
      // "cypress/e2e/Ghost-5.73.2/staff/invite-staff-member.cy.js",
      // "cypress/e2e/Ghost-5.73.2/staff/verify-comments-staff-member.cy.js",
      "cypress/e2e/Ghost-5.73.2/members/add-member.cy.js",
      "cypress/e2e/Ghost-5.73.2/members/edit-member.cy.js"*/
    ],
    setupNodeEvents(on, config) {
      // implement node event listeners here
      getCompareSnapshotsPlugin(on, config);
    },   
  },
});