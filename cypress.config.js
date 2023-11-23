const { defineConfig } = require("cypress");
const resemble = require('resemblejs');

module.exports = defineConfig({
  projectId: 'seuha9',
  chromeWebSecurity: false,
  e2e: {
    baseUrl: 'http://localhost:2369/',
    baseUrlv2: 'https://grupo-miso.ghost.io/',
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
    specPattern: [
      "cypress/e2e/regresions.cy.js",
      "cypress/e2e/imagecomparison.cy.js",
      "cypress/e2e/Ghost-5.27.0/signin/invalid-data.cy.js",
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
      // "cypress/e2e/Ghost-5.27.0/staff/invite-staff-member.cy.js",
      // "cypress/e2e/Ghost-5.27.0/staff/verify-comments-staff-member.cy.js",
      // "cypress/e2e/Ghost-5.27.0/members/add-member.cy.js",
      // "cypress/e2e/Ghost-5.27.0/members/edit-member.cy.js",
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
      "cypress/e2e/Ghost-5.73.2/tags/assign-tag.cy.js"//,
      // "cypress/e2e/Ghost-5.73.2/tags/edit-tag.cy.js",
      // "cypress/e2e/Ghost-5.73.2/staff/invite-staff-member.cy.js",
      // "cypress/e2e/Ghost-5.73.2/staff/verify-comments-staff-member.cy.js",
      // "cypress/e2e/Ghost-5.73.2/members/add-member.cy.js",
      // "cypress/e2e/Ghost-5.73.2/members/edit-member.cy.js"
    ],
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        compareImages: ({ image1Path, image2Path }, options) => {
          return new Promise((resolve, reject) => {
            resemble(image1Path)
              .compareTo(image2Path)
              .onComplete(data => {
                const diffImageDataUrl = createDiffImage(data);
                resolve(diffImageDataUrl);
              });
          });
        },
      });
    }, 
    env: {
      "base_url" : "http://localhost:2369/",
      "user":'dejahvuuu@gmail.com',
      "passw":'Gu4c4m4y0.2023',
      "url_staff":'http://localhost:2368/ghost/#/settings/staff',  
      "url_members":'http://localhost:2368/ghost/#/members',
      "url_tags":'http://localhost:2368/ghost/#/tags'
    }    
  },
});