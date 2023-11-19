# Ghost Pruebas E2E

This repository stores tests for Ghost performed in Cypress and Kraken.

[README Kraken](./pruebas-kraken/README.md)


## Cypress Versions 

Versión xx.xxx

## Ghost Versions 

| 1. Versión inicial | Ghost 5.68.0 |  |
| 1.1 Ghost-Cli |  1.25.2 |  |
| 2. Nueva versión | Ghost 5.73.2 + | https://grupo-miso.ghost.io/ | 
| 3. Versión Node JS  | v18.18.2 | nvm install 18 | 
| 4. Version npm | 9.8.1 | nvm install 18 | 
| 5. Versión Faker | 9.8.1 | npm install @faker-js/faker --save-dev | 

```bash
npm install
```

### Ghost URL's
Para mayor facilidad en la ejecución de pruebas, se comparten URL's a sitios en funcionamiento con las versiones de Ghost utilizadas para la ejecución de pruebas E2E
* Ghost 5.68.0
* [Ghost 5.73.2](https://grupo-miso.ghost.io/)

### Run test
```bash ejecución gráfica
npm run cy:open
npx cypress open
```
```bash ejecución headless
npx cypress run --headless  
```
```bash ejecución headless por funcionalidades 
npx cypress run --headless  --spec 'cypress/e2e/signin/*'
npx cypress run --headless  --spec 'cypress/e2e/post/*'
npx cypress run --headless  --spec 'cypress/e2e/page/*'
npx cypress run --headless  --spec 'cypress/e2e/tags/*'
npx cypress run --headless  --spec 'cypress/e2e/staff/*'
npx cypress run --headless  --spec 'cypress/e2e/members/*'
```
Notas:
La siguiente es la configuración a tener en cuenta para el archivo cypress.config.js 
```bash
cypress.config.js
```


Funcionalidades probadas
--------------------------------------------
![Screenshot_30](https://github.com/MISW-pruebas-equipo18/ghost-pruebas-e2e/assets/142247170/7cb11e43-3fa8-4876-9fec-b400d3a69cf1)

* Escenarios de prueba Kraken: [pruebas-kraken](./pruebas-kraken)
* Escenarios de prueba Cypress: [pruebas-cypress](./cypress)
