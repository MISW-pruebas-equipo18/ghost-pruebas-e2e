# Ghost Pruebas E2E

This repository stores tests for Ghost performed in Cypress and Kraken.

[README Kraken](./pruebas-kraken/README.md)


## Cypress Versions 

Versión xx.xxx

## Ghost Versions 

| Tecnología      | Versión       | Descripción |
|---------------|------------------|---------------|
| Ghost versión inicial | Ghost 5.27.0 |  |
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
* Ghost 5.27.0 (se debe instalar), para mayor facilidad se comparte instrucciones mediante las cuales fueron montadas en Docker
  ```bash
  docker run -d -e url=http://localhost:3001 -p 3001:2368 --name ghost_5.27.0 ghost:5.27.0
  docker run -d --name some-ghost -e NODE_ENV=development -e url=http://localhost:3001 -p 3001:2368 ghost:5.27.0
  ```
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

### Ejecución headless por veriones de Ghost
```bash
npx cypress run --headless  --spec 'cypress/e2e/Ghost-5.27.0/**'
npx cypress run --headless  --spec 'cypress/e2e/Ghost-5.73.2/**'
```

### Ejecución headless por funcionalidades 
```bash
npx cypress run --headless  --spec 'cypress/e2e/Ghost-5.27.0/signin/*'
npx cypress run --headless  --spec 'cypress/e2e/Ghost-5.27.0/post/*'
npx cypress run --headless  --spec 'cypress/e2e/Ghost-5.73.2/signin/*'
npx cypress run --headless  --spec 'cypress/e2e/Ghost-5.73.2/post/*'
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
    baseUrl: 'http://localhost:3001/',
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
    }
```


Funcionalidades probadas
--------------------------------------------
![Screenshot_30](https://github.com/MISW-pruebas-equipo18/ghost-pruebas-e2e/assets/142247170/7cb11e43-3fa8-4876-9fec-b400d3a69cf1)

* Escenarios de prueba Kraken: [pruebas-kraken](./pruebas-kraken)
* Escenarios de prueba Cypress: [pruebas-cypress](./cypress)

### Aspectos a tener en cuenta
* Tener la fecha y hora sincronizada con internet para evitar errores de actualización en Ghost 5.73.2
* La contraseña a configurar para las pruebas debe tener minimo una lontigud de 10 caracteres, se recomienda que tenga letras, numeros y caracteres especiales, esto para evitar error por validación de caracteristicas de la contraseña y las demás pruebas dejen de funcionar debido a bloqueo del usuario
