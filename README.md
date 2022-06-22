# UTILIZANDO FRAMEWORK BACKEND

-  Acceder al proyecto en la dirección **http://localhost:9000**
   SE PUEDE CAMBIAR DESDE EL ARCHIVO .ENV

\*\*Para este desafío se modificó la persistencia de los datos integrando los conceptos DAO,DTO y FACTORY con las tecnologías de FileSystem y MONGODB.

## Consignas

-  Se modificó el servidor para ser utilizado con el framework KOA para el acceso de los datos guardados en la base de datos de productos y mensajes, así como el acceso a la información del process en las siguientes rutas:

1. /api/productos/ --> obtener productos, producto por id, borrar products
2. /api/mensajes/ --> obtener mensajes, agregar nuevo mensaje
3. /process/info/ --> obtener la información del process.

### Loggueo

**Logger modo producción se activa definiendo la variable de entorno NODE_ENV cómo PROD.**

-  Se implementó el uso de Winston para el manejo de logs en los niveles, info, warn y error.

*  info: se muestra por consola
*  warn: en el archivo warn.log
*  error: en el archivo error.log "Solo errores del manejo de WebSockets"

### Main Dependencies

-  Para el servidor, manejo de rutas [Express JS](https://expressjs.com/es/ "Ver más")
-  Para el manejo de sessions en mongo [connect-Mongo](https://www.npmjs.com/package/connect-mongo "Ver más")
-  Para manejo de session en la app [Express Session](https://www.npmjs.com/package/express-session "Ver más")
-  Para el render del frontend [Express Handlebars](https://www.npmjs.com/package/express-handlebars "Ver más")
-  Middleware de autenticación para Node [passport](https://www.npmjs.com/package/passport "Ver más")
-  Para el manejo de autenticación de Facebook [passport-facebook](https://www.npmjs.com/package/passport-facebook "Ver más")
-  Para la implementación de mysql [mysql](https://momentjs.com/ "Ver más")
-  Para la normalización de objetos anidados en la instancia de mensajes [normalizr](https://www.npmjs.com/package/normalizr "Ver más")
-  Para la configuracion del servidor y la comunicación entre el backend y frontend [socket io](https://socket.io/ "Ver más")

-  Se utilizó la dependencia de dotenv para la implementacion y uso de variables de entorno .env [dotenv](https://www.npmjs.com/package/dotenv "Ver más")
-  Herramienta para trabajar con MongoDB [mongoose](https://www.npmjs.com/package/mongoose "Ver más")

#### Created by: **Ivan Hernández Preza**

-
