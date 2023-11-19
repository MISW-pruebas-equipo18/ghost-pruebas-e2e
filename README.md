# Ghost Pruebas E2E

This repository stores tests for Ghost performed in Cypress and Kraken.

[README Kraken](./pruebas-kraken/README.md)


## Cypress Versions 

Versión xx.xxx

## Ghost Versions 

| Tecnología      | Versión       | Descripción |
|---------------|------------------|---------------|
| Ghost versión inicial | Ghost 5.27.0 |  |
| Ghost-cli versión inicial | Ghost-Cli 1.25.2 |  |
| Ghost versión inicial | Ghost 5.27.0 | [http://localhost:3001/ghost/#/signin](http://localhost:3001/ghost/#/signin) consultar sección Despliegue de Ghost en Docker |
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
* Ghost 5.27.0 consultar sección Despliegue de Ghost en Docker
* [Ghost 5.73.2](https://grupo-miso.ghost.io/)

## Despliegue de Ghost en Docker
Para realizar la ambientación de la version Ghost 5.27 se utilizara la imagen docker del repositorio de Ghost siga los siguientes pasos y ejecute los comandos con permisos de administrador según su SO:

1. Debe contar con el servicio docker instalado en su maquina, el presente paso a paso se hizo con la versión: Docker Engine - Community 24.0.7
```bash
sudo docker info
```
2. verifique las imagenes presente en docker y detenga los contenedores relacionados a imagenes Ghost en caso de tener alguna.
listar las imagenes docker:
```bash
sudo docker images
```
listar los contenedores en ejecución:
```bash
sudo docker ps 
```
3. obtener la imagen de ghost V.5.27 en modo desarrollo:    

```bash
sudo docker run -d --name ghost_5.27 -e NODE_ENV=development -e url=http://localhost:3001 -p 3001:2368 ghost:5.27
```
4. Al finalizar la importación de la imagen y creación del contenedor el sitio: [http://localhost:3001/ghost/#/signin](http://localhost:3001/ghost/#/signin) estara disponible
5. Realice la creación del usuario administrador con el correo y clave de su preferencia, recuerde que estos datos se deben configurar en los archivos de las herramientas cypress y kraken para lograr hacer la ejecución de los escenarios.

Nota: Estos pasos fueron desarrollados en Ubuntu 22.04

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
