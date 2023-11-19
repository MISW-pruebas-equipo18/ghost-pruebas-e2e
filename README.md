# Ghost Pruebas E2E

This repository stores tests for Ghost performed in Cypress and Kraken.

[README Kraken](./pruebas-kraken/README.md)


## Cypress Versions 

Versión xx.xxx

## Ghost Versions 

| Tecnología      | Versión       | Descripción |
|---------------|------------------|---------------|
| Ghost versión inicial | Ghost 5.68.0 |  |
| Ghost-cli versión inicial | Ghost-Cli 1.25.2 |  |
| Ghost versión inicial | Ghost 5.68.0 |  |
| Ghost nueva versión | Ghost 5.73.2+ | [https://grupo-miso.ghost.io/](https://grupo-miso.ghost.io/) |
| Noje JS | v18.18.2 | nvm install 18 |
| Noje JS | v18.18.2 | nvm install 18 |
| npm | v9.8.1 | nvm install 18 |
| Faker | v9.8.1 | npm install @faker-js/faker --save-dev |

```bash
npm install
```

## Ghost URL's
Para mayor facilidad en la ejecución de pruebas, se comparten URL's a sitios en funcionamiento con las versiones de Ghost utilizadas para la ejecución de pruebas E2E
* Ghost 5.68.0
* [Ghost 5.73.2](https://grupo-miso.ghost.io/)

## Run test
### Ejecución gráfica
```bash
npm run cy:open
npx cypress open
```
### Ejecución headless
```bash
npx cypress run --headless  
```
### Ejecución headless por funcionalidades 
```bash
npx cypress run --headless  --spec 'cypress/e2e/signin/*'
npx cypress run --headless  --spec 'cypress/e2e/post/*'
npx cypress run --headless  --spec 'cypress/e2e/page/*'
npx cypress run --headless  --spec 'cypress/e2e/tags/*'
npx cypress run --headless  --spec 'cypress/e2e/staff/*'
npx cypress run --headless  --spec 'cypress/e2e/members/*'
```
## Configuración
La siguiente es la configuración a tener en cuenta para el archivo cypress.config.js 

| Tecnología      | Especificación       |
|---------------|------------------|
| baseUrl | Url de la versión inicial de Ghost |
| baseUrlv2 | Url de la nueva versión de Ghost para pruebas de regresión |
| specPattern | Llave de configuración para establecer el orden de ejecución de los escenarios de prueba  |
| user | Usuario de la versión inicial de Ghost para el login |
| passw | Password del usuario de la versión inicial de Ghost para el login |
| newPassw | Nuevo password a asignar al usuario de la versión inicial de Ghost para pruebas de cambio de contraseña |
| userv2 | Usuario de la nueva versión de Ghost para el login en pruebas de regresión |
| passwv2 | Password del usuario de la nueva versión de Ghost para el login y pruebas de regresión |
| newPasswv2 | Nuevo password a asignar al usuario de la nueva versión de Ghost para pruebas de regresión |
| testIsolation | Deshabilitar el aislamiento de pruebas en las pruebas de un extremo a otro para describir si un conjunto de pruebas debe ejecutarse en un contexto de navegador limpio o no, para este caso lo deshabilitamos con el objetivo de manejar el Login y el Logout entre archivos de prueba |

```bash
e2e: {
    baseUrl: 'http://localhost:2368/',
    baseUrlv2: 'https://grupo-miso.ghost.io/',
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
    user:'userGhostv1',
    passw:'passGhostv1',
    newPassw:'newpassGhostv1',
    userv2:'userGhostNewVersion',
    passwv2:'passGhostNewVersion',
    newPasswv2:'newpassGhostNewVersion',
    uservisitor:'user',
    passwordvisitor: 'pass',
    testIsolation: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
```


Funcionalidades probadas
--------------------------------------------
![Screenshot_30](https://github.com/MISW-pruebas-equipo18/ghost-pruebas-e2e/assets/142247170/7cb11e43-3fa8-4876-9fec-b400d3a69cf1)

* Escenarios de prueba Kraken: [pruebas-kraken](./pruebas-kraken)
* Escenarios de prueba Cypress: [pruebas-cypress](./cypress)
