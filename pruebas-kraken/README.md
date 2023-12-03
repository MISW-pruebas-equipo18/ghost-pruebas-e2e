# Instrucciones de ejecución


## Ghost URL's
Para mayor facilidad en la ejecución de pruebas, se comparten URL's a sitios en funcionamiento con las versiones de Ghost utilizadas para la ejecución de pruebas E2E
* Ghost 5.27.0 consultar sección Despliegue de Ghost en Docker
* [Ghost 5.73.2](https://grupo-miso.ghost.io/)

## Ghost Versions 

| Tecnología      | Versión       | Descripción |
|---------------|------------------|---------------|
| Ghost versión inicial | Ghost 5.27.0 |  |
| Ghost-cli versión inicial | Ghost-Cli 1.25.2 |  |
| Ghost versión inicial | Ghost 5.27.0 | [http://localhost:3001/ghost/#/signin](http://localhost:3001/ghost/#/signin) consultar sección Despliegue de Ghost en Docker |
| Ghost nueva versión | Ghost 5.73.2+ | [https://grupo-miso.ghost.io/](https://grupo-miso.ghost.io/) |
| Noje JS | v18.18.2 | nvm install 18 |
| npm | v9.8.1 | nvm install 18 |


## 1. Despliegue de Ghost en Docker
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


## 2. Configurar el proyecto

La única configuración necesaria es agregar las credenciales de acceso en el proyecto.
Para ello, debe copiar el archivo `properties.json.example`, renombrarlo a `properties.json` y agregar las credenciales de acceso en el archivo.

Puede realizar esto ejecutando el siguiente comando:

```bash
cp properties.json.example properties.json
vim properties.json # o el editor de texto de su preferencia
```

Finalmente, cambiar el valor de las llaves `"USERNAME"`, `"PASSWORD"`, `"URLLOGIN"` por las credenciales de acceso y la url relacionada en el cuadro Ghost Versions.

Credenciales de acceso Ghost Versión 5.27 url: http://localhost:3001/ghost/#/signin Usuario y Clave: Creado por usted en la ambientación de la imagen docker

Credenciales de acceso Ghost Versión 5.73 url: https://grupo-miso.ghost.io/ghost/#/signin Usuario: albertogalvis@protonmail.com Clave: Gu4c4m4y0.2024

## 4. Ejecutar las pruebas del proyecto

Ejecute el siguiente comando para ejecutar el proyecto:

```bash
./node_modules/kraken-node/bin/kraken-node run
```

Esto ejecutará las pruebas del proyecto y generará un reporte en la carpeta `reports`.
Para ver el reporte, abra el archivo `reports/<id>/index.html`.

# Semana 7 pruebas con datos aleatorios

## 1. Preparación del ambiente

Version Ghost: 5.74.2
Alojada: https://grupo-miso.ghost.io/ghost/#/signin

Para extender las capacidades de kraken se instalaron las siguientes librerias: 
* Faker 6.6.6
* axios 1.6.2
* csv-parser 3.0.0

Por favor ejecutar el siguiente comando en la carpeta raiz del proyecto (Pruebas-Kraken)
```bash
npm install
```

## 2. Escenarios y estrategias de generación de datos aleatorios 

El proyecto cuenta con una carpeta con el nombre Escenarios en esta se encuentran los diferentes archivos según la estrategia implementada, para mayor detalle de consulte el inventario de escenarios: https://uniandes.sharepoint.com/:x:/s/PruebasAutomatizadas220/EWG23SiQztFIq1-w4N7MiH0BHNvcpehwNgkwgyB4IKyJzw?e=YcMV5K debe ingresar con la cuenta unianes

Para ejecutar el grupo de escenarios debe copiar el archivo .feature y ubicarlo en el directorio: ./features

En la carpeta datapool se encuentran los archivos base para la estrategia a priori, para mayor detalle consulte la wiki - Semana 7

## 3. Reporte de incidencias

Las inconsistencias enconetradas fueron documentadas en la siguiente ubicación: https://github.com/MISW-pruebas-equipo18/ghost-pruebas-e2e/issues

# Semana 8

Los escenarios creados para esta semana en Kraken son:
### 1. Escenarios aleatorios usando herramienta Kraken

| Scenario Name                                              | Description                                                                                                                                                                                                                                            |
|-----------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **POST - Create and Edit a Post with Random Title and Body**         | Given a user is logged in, when the user creates a new post with a random title and body, then the user edits the post, modifying both the title and body.                                                                                         |
| **POST - Create, Edit, and Delete a Post with Random Title and Body** | Given a user is logged in, when the user creates a new post with a random title and body, and deletes the post, then the post should no longer exist.                                                                                              |
| **POST - Put a Post as Draft and Publish It with Random Title and Body** | Given a user is logged in, when the user creates a new post with a random title and body, puts the post as a draft, and publishes the draft, then the post should be visible to the public.                                                             |
| **POST - Create, and Unpublish a Post with Random Title and Body**     | Given a user is logged in, when the user creates a new post with a random title and body, and unpublishes the post, then the post should not be visible to the public.                                                                              |
| **POST - Delete a Post Created with Random Data**                    | Given a user is logged in, when the user creates a new post with random data, and deletes the post, then the post should no longer exist.                                                                                                            |
| **MEMBERS - Create a Member with Random Name and Email**              | Given a user is logged in, when the user creates a new member with a random name and email, then the member should be successfully created.                                                                                                           |
| **MEMBERS - Create a Member with Random Name and Invalid Email**     | Given a user is logged in, when the user creates a new member with a random name and an invalid email, then the member creation should fail due to an invalid email.                                                                                   |
| **MEMBERS - Create a Member with Empty Name and Random Email**       | Given a user is logged in, when the user creates a new member with an empty name and a random email, then the member creation should fail due to an empty name.                                                                                       |
| **MEMBERS - Edit a Member with Random Name and Email**               | Given a user is logged in, when the user edits an existing member with a random name and email, then the member should be successfully edited.                                                                                                          |
| **MEMBERS - Edit a Member with Random Name and Invalid Email**      | Given a user is logged in, when the user edits an existing member with a random name and an invalid email, then the member editing should fail due to an invalid email.                                                                                |
| **MEMBERS - Edit a Member with Empty Name and Random Email**        | Given a user is logged in, when the user edits an existing member with an empty name and a random email, then the member editing should fail due to an empty name.                                                                                    |
| **MEMBERS - Delete a Member Created with Random Data**              | Given a user is logged in, when the user creates a new member with random data, and deletes the member, then the member should no longer exist.                                                                                                       |
| **TAGS - Create a Tag with Random Name and Description**            | Given a user is logged in, when the user creates a new tag with a random name and description, then the tag should be successfully created.                                                                                                            |
| **TAGS - Create a Tag with Random Name and Invalid Description**    | Given a user is logged in, when the user creates a new tag with a random name and an invalid description, then the tag creation should fail due to an invalid description.                                                                           |
| **TAGS - Create a Tag with Invalid Name and Random Description**    | Given a user is logged in, when the user creates a new tag with an invalid name and a random description, then the tag creation should fail due to an invalid name.                                                                               |
| **TAGS - Edit a Tag with Random Name and Description**               | Given a user is logged in, when the user edits an existing tag with a random name and description, then the tag should be successfully edited.                                                                                                          |
| **TAGS - Edit a Tag with Random Name and Invalid Description**      | Given a user is logged in, when the user edits an existing tag with a random name and an invalid description, then the tag editing should fail due to an invalid description.                                                                        |
| **TAGS - Edit a Tag with Invalid Name and Random Description**      | Given a user is logged in, when the user edits an existing tag with an invalid name and a random description, then the tag editing should fail due to an invalid name.                                                                            |
| **TAGS - Delete a Tag Created with Random Data**                    | Given a user is logged in, when the user creates a new tag with random data, and deletes the tag, then the tag should no longer exist.                                                                                                               |
| **PAGINAS - Create and Edit a Page with Random Title and Body**     | Given a user is logged in, when the user creates a new page with a random title and body, then the user edits the page, modifying both the title and body.                                                                                            |
| **PAGINAS - Create, Edit, and Delete a Page with Random Title and Body** | Given a user is logged in, when the user creates a new page with a random title and body, and deletes the page, then the page should no longer exist.                                                                                                |
| **PAGINAS - Put a Page as Draft and Publish It with Random Title and Body** | Given a user is logged in, when the user creates a new page with a random title and body, puts the page as a draft, and publishes the draft, then the page should be visible to the public.    
|
| **PAGINAS - Create, and Unpublish a Page with Random Title and Body**     | Given a user is logged in, when the user creates a new page with a random title and body, and unpublishes the page, then the page should not be visible to the public.                                                                            |
| **PAGINAS - Delete a Page Created with Random Data**                    | Given a user is logged in, when the user creates a new page with random data, and deletes the page, then the page should no longer exist.     


Para ejecutar el grupo de escenarios debe copiar el archivo .feature y ubicarlo en el directorio: ./features

Los escenarios aleatorios e2e desarrollados se realizaron en el framework Kraken. La ejecución de todos los escenarios secuencialmente se puede encontrar en el siguiente video adjunto: https://drive.google.com/file/d/1xLqBC5aKK6-C8QwImMIQPEbU5xX7SkGF/view 
