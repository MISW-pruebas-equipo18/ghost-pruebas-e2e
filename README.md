# Ghost Pruebas E2E

This repository stores tests for Ghost performed in Cypress and Kraken.

## Cypress Versions 

Versión 13.5.0

## Readme Kraken
[README Kraken](./pruebas-kraken/README.md)

## Ghost Versions 

| Tecnología      | Versión       | Descripción |
|---------------|------------------|---------------|
| Ghost versión inicial | Ghost 5.27.0 |  |
| Ghost nueva versión | Ghost 5.73.2+ | [https://grupo-miso.ghost.io/](https://grupo-miso.ghost.io/) |
| Noje JS | v18.18.2 | nvm install 18 |
| npm | v9.8.1 | nvm install 18 |
| Faker | v9.8.1 | npm install @faker-js/faker --save-dev |

Se recomienda realizar la instalación de dependencias del proyecto a través del comando
```bash
npm install
```
## Semana 6
### Ghost URL's
Para mayor facilidad en la ejecución de pruebas, se comparten URL's a sitios en funcionamiento con las versiones de Ghost utilizadas para la ejecución de pruebas E2E
* Ghost 5.27.0 (se debe instalar), para mayor facilidad se comparte instrucciones mediante las cuales fueron montadas en Docker
  ```bash
  docker run -d -e url=http://localhost:3001 -p 3001:2368 --name ghost_5.27.0 ghost:5.27.0
  docker run -d --name some-ghost -e NODE_ENV=development -e url=http://localhost:3001 -p 3001:2368 ghost:5.27.0
  ```
* Ghost 5.27.0 consultar sección Despliegue de Ghost en Docker
* [Ghost 5.73.2](https://grupo-miso.ghost.io/)

### Despliegue de Ghost en Docker
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

### Run test
#### Ejecución gráfica
```bash
npm run cy:open
npx cypress open
```
#### Ejecución headless
```bash
npx cypress run --headless  
```

#### Ejecución headless por veriones de Ghost
```bash
npx cypress run --headless  --spec 'cypress/e2e/Ghost-5.27.0/**'
npx cypress run --headless  --spec 'cypress/e2e/Ghost-5.73.2/**'
```

#### Ejecución headless por funcionalidades 
```bash
npx cypress run --headless  --spec 'cypress/e2e/Ghost-5.27.0/signin/*'
npx cypress run --headless  --spec 'cypress/e2e/Ghost-5.27.0/post/*'
npx cypress run --headless  --spec 'cypress/e2e/Ghost-5.73.2/signin/*'
npx cypress run --headless  --spec 'cypress/e2e/Ghost-5.73.2/post/*'
```
### Configuración
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


### Funcionalidades probadas
--------------------------------------------
![Screenshot_30](https://github.com/MISW-pruebas-equipo18/ghost-pruebas-e2e/assets/142247170/7cb11e43-3fa8-4876-9fec-b400d3a69cf1)

* Escenarios de prueba Kraken: [pruebas-kraken](./pruebas-kraken)
* Escenarios de prueba Cypress: [pruebas-cypress](./cypress)

### Aspectos a tener en cuenta
* Tener la fecha y hora sincronizada con internet para evitar errores de actualización en Ghost 5.73.2
* La contraseña a configurar para las pruebas debe tener minimo una lontigud de 10 caracteres, se recomienda que tenga letras, numeros y caracteres especiales, esto para evitar error por validación de caracteristicas de la contraseña y las demás pruebas dejen de funcionar debido a bloqueo del usuario

## Semana 7 - Pruebas a partir de estrategias de generación de datos

## Readme Kraken
[README Kraken](./pruebas-kraken/README.md)

### Ghost Versions 

| Tecnología      | Versión       | Descripción |
|---------------|------------------|---------------|
| Ghost nueva versión | Ghost 5.73.2 |  |
| Noje JS | v18.18.2 | nvm install 18 |
| npm | v9.8.1 | nvm install 18 |
| Faker | v9.8.1 | npm install @faker-js/faker --save-dev |

Para la ejecución de pruebas en Cypress se hizo uso principalmente de dos estrategias de prueba las cuales corresponden a pool de datos a-priori y pool de datos (pseudo) aleatorio dinámico, para la ejecución de los escenarios es necesario tener en cuenta la siguiente configuración:

1. Para la presente entrega no fue posible contar con una URL de un sitio público de Ghost, por lo cual es necesario instalar la versión 5.73.2 de Ghost la cual fue la versión seleccionada para la ejecución de pruebas a partir de estrategias de generación de datos, para montar dicha versión en docker haga uso de las siguientes instrucciones de linea de comandos:

   ```bash
   docker run -d --name ghost_5.73.2 -e NODE_ENV=development -e url=http://localhost:3002 -p 3002:2368 ghost:5.73.2
   ```
    En caso de presentar inconvenientes con la instalación ejecute las dos siguientes instrucciones
    ```bash
    docker run -d -e url=http://localhost:3002 -p 3002:2368 --name ghost_5.73.2 ghost:5.73.2
    docker run -d --name ghost_5.73 -e NODE_ENV=development -e url=http://localhost:3002 -p 3002:2368 ghost:5.73.2
    ```
## About Cypress   
2. La configuración a tener en cuenta respecto al archivo "cypress.config.js" para estas pruebas es la siguiente:
3. Las pruebas para esta entrega se correran con la URL del parametro "baseUrlv2"
4. Tener en cuenta que para correr las pruebas headless la "baseUrl" debe tener una URL válida, por lo cual se recomienda que tanto el parametro "baseUrl" como "baseUrlv2" tengan el mismo valor
5. Para este tipo de pruebas y para esta versión, solo se debe tener en cuenta ajustar los parametros "userv2", "passwv2", "uservisitor" y "passwordvisitor" con el mismo user y password para todos para una correcta autenticación y correcta ejecución de pruebas, este paso es importante ya que una contraseña incorrecta podría ocasionar que se bloquee el usuario y las pruebas fallen.
6. El orden defindo para las pruebas en el parametro "specPattern" es el siguiente:
   ```bash
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
   ```
7. Para ejecutar las pruebas por headless es necesario ejecutar los siguientes comandos:
  ```bash
  npx cypress run --headless
  ```
8. Tener en cuenta que los escenarios negativos son considerados aquellos en los cuales el should o el assert no se cumple, por lo cual en la ejecución de pruebas encontrarán algunas que no llegan a buen fin, pero es especificamente porque se detecta que el escenario no es posible en la aplicación y su resultado es el esperado, negativo. A continuación un resumen de la ejecución de los escenarios:
   
![image](https://github.com/MISW-pruebas-equipo18/ghost-pruebas-e2e/assets/142758558/df254072-9edf-4feb-9578-35df7bf9ce02)

## Semana 8

Importante. Consultar el readme de kraken

### 2. Pruebas de regresion visual
Se uso la siguiente herramienta para integrarla con Cypress:
https://github.com/Andremoniy/cypress-visual-regression-resemble-js 

Para ejecutar las pruebas de regresion visual hay que usar el siguiente comando del plugin de resemble para cypress:

```bash

./node_modules/.bin/cypress run --env type=actual

```
La estructura de carpetas generada por la herramienta de regresion es la siguiente:
 - **Carpeta screenshots:** para las imagenes mas recientes
 - **Carpeta snapshots/base:** para las imagenes menos recientes
 - **Carpeta snapshots/diff:** para las diferencias en las imagenes encontradas entre una y otra despues de ejecutar el comando de arriba.

![estructura de las carpetas](https://i.postimg.cc/Y09nRHg1/Screenshot-13.png)
#### 2.1 Reporte
El reporte se realizo siguiendo el modelo del tutorial de Playwright pero aplicado a Cypress:
se encuentra como archivo .html en la carpeta results ubicada dentro de la carpeta cypress

![enter image description here](https://i.postimg.cc/c4786K62/Screenshot-14.png) 

Para generar el reporte:

```bash

node index.js

```

### 3. Escenarios de pruebas de exploración
Las usamos para iniciar el proceso de exploración de nuevas funcionalidades de la aplicación bajo pruebas, su objetivo es ampliar la cobertura de conocimiento de la aplicación para establecer una línea base de información para la codificación y ejecución de los demás grupos de pruebas, adicionalmente, permiten la validación y verificación de la aplicación y la identificación de unos primeros hallazgos.
[inventario-pruebas-exploratorias.xlsx](https://github.com/MISW-pruebas-equipo18/ghost-pruebas-e2e/files/13537919/inventario-pruebas-exploratorias.xlsx)
