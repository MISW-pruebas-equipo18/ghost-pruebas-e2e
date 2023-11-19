# Instrucciones de ejecución


## Ghost URL's
Para mayor facilidad en la ejecución de pruebas, se comparten URL's a sitios en funcionamiento con las versiones de Ghost utilizadas para la ejecución de pruebas E2E
* Ghost 5.27.0 consultar sección Despliegue de Ghost en Docker
* [Ghost 5.73.2](https://grupo-miso.ghost.io/)


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

Finalmente, cambiar el valor de las llaves `"USERNAME"` y `"PASSWORD"` por las credenciales de acceso.

## 4. Ejecutar las pruebas del proyecto

Ejecute el siguiente comando para ejecutar el proyecto:

```bash
./node_modules/kraken-node/bin/kraken-node run
```

Esto ejecutará las pruebas del proyecto y generará un reporte en la carpeta `reports`.
Para ver el reporte, abra el archivo `reports/<id>/index.html`.

