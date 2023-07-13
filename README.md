# Tienda de Libros Online

Este programa es una tienda de libros online con funcionalidad de carrito de compras. Solo los usuarios logueados pueden acceder al carrito y guardar libros como favoritos.

## Características principales

- Búsqueda de libros por título, categoría o autor.
- Filtrado de libros por categoría, editorial y autor en una página adicional.
- Utilización de un backend para la actualización del stock de libros.
- Próximamente: Implementación del ABM (Alta, Baja y Modificación) de libros y seguimiento de órdenes desde el panel de administración.

## Dependencias

El programa utiliza las siguientes dependencias:

- [connect-flash](https://www.npmjs.com/package/connect-flash) - Para mostrar mensajes flash en la aplicación.
- [connect-mongo](https://www.npmjs.com/package/connect-mongo) - Para almacenar la sesión de usuario en MongoDB.
- [ejs](https://www.npmjs.com/package/ejs) - Para la generación de vistas HTML.
- [express](https://www.npmjs.com/package/express) - Framework web para Node.js.
- [express-ejs-layouts](https://www.npmjs.com/package/express-ejs-layouts) - Para la creación de diseños de página en Express.js.
- [express-session](https://www.npmjs.com/package/express-session) - Middleware para el manejo de sesiones en Express.js.
- [mongodb](https://www.npmjs.com/package/mongodb) - Controlador de MongoDB para Node.js.
- [mongoose](https://www.npmjs.com/package/mongoose) - Modelado de objetos MongoDB para Node.js.
- [morgan](https://www.npmjs.com/package/morgan) - Middleware para el registro de solicitudes HTTP en Express.js.
- [passport](https://www.npmjs.com/package/passport) - Middleware de autenticación para Node.js.
- [passport-local](https://www.npmjs.com/package/passport-local) - Estrategia de autenticación local para Passport.js.
- [passport-local-mongoose](https://www.npmjs.com/package/passport-local-mongoose) - Plug-in de Passport.js para simplificar la autenticación con Mongoose.

## Instalación

1. Clona el repositorio: `git clone https://github.com/tu-usuario/tu-repositorio.git`
2. Navega al directorio del proyecto: `cd tu-repositorio`
3. Instala las dependencias: `npm install`
4. Configura las variables de entorno en un archivo `.env` (consulta el archivo `.env.example` para obtener una plantilla).
5. Inicia la aplicación: `npm start`

¡Listo! Ahora puedes acceder a la tienda de libros online en tu navegador.

## Contribución

Si deseas contribuir a este proyecto, sigue los siguientes pasos:

1. Haz un fork del repositorio.
2. Crea una rama para tu contribución: `git checkout -b mi-rama`
3. Realiza tus cambios y realiza commit: `git commit -m "Descripción de los cambios"`
4. Sube tus cambios a tu repositorio: `git push origin mi-rama`
5. Abre una pull request en el repositorio original.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Para más detalles, consulta el archivo [LICENSE](LICENSE).

