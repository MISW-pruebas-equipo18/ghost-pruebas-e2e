# Ghost Pruebas E2E

This repository stores tests for Ghost performed in Cypress and Kraken.

[README Kraken](./pruebas-kraken/README.md)


## How to use Cypress

Install

```bash
npm install
```

Run test

```bash
npm run cy:open
```
Note:
En el archivo cypress.config.js se debe especificar en los 2 lugares donde aparecen el user y el password del ghost local que tengan los tutores para prueba tanto en las variables de e2e como en las variables anidadas de la variable env 
```bash
cypress.config.js
```

Funcionalidades probadas
--------------------------------------------
![Screenshot_30](https://github.com/MISW-pruebas-equipo18/ghost-pruebas-e2e/assets/142247170/7cb11e43-3fa8-4876-9fec-b400d3a69cf1)

* Escenarios de prueba Kraken: [pruebas-kraken](./pruebas-kraken)
* Escenarios de prueba Cypress: [pruebas-cypress](./cypress)
