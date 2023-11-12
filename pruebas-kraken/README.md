# Instrucciones de ejecución

## 1. Instalar las dependencias del proyecto

Navege a la carpeta `pruebas-kraken` (la carpeta padre de este archivo) y ejecute el siguiente comando para instalar las dependencias del proyecto:

```bash
npm install
```

## 2. Configurar el proyecto

La única configuración necesaria es agregar las credenciales de acceso en el proyecto.
Para ello, debe copiar el archivo `properties.json.example`, renombrarlo a `properties.json` y agregar las credenciales de acceso en el archivo.

Puede realizar esto ejecutando el siguiente comando:

```bash
cp properties.json.example properties.json
vim properties.json # o el editor de texto de su preferencia
```

Finalmente, cambiar el valor de las llaves `"USERNAME"` y `"PASSWORD"` por las credenciales de acceso.

## 3. Ejecutar las pruebas del proyecto

Ejecute el siguiente comando para ejecutar el proyecto:

```bash
./node_modules/kraken-node/bin/kraken-node run
```

Esto ejecutará las pruebas del proyecto y generará un reporte en la carpeta `reports`.
Para ver el reporte, abra el archivo `reports/<id>/index.html`.
