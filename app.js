import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import bodyParser from 'body-parser';
import morgan from "morgan"
import session from 'express-session';
import expressEjsLayouts from 'express-ejs-layouts';
import configureFlash from './backend/config/flash.js'
import connectDB from './backend/config/db.js';
import indexRouter from './backend/routes/index.routes.js';
import dashboardRouter from './backend/routes/dashboard.routes.js';
// import authRouter from './backend/routes/auth.js';
// import booksRouter from './backend/routes/books.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración de los archivos estáticos
app.use(express.static(path.join(__dirname, 'frontend/public')));
app.set('views', [
    path.join(__dirname, 'frontend/views'),
    path.join(__dirname, 'backend/views')
  ]);

// Configurar la carpeta de vistas del backend
app.set('backendViews', path.join(__dirname, 'backend/views'));
app.set('backendViewEngine', 'ejs');

// Configuración del motor de plantillas EJS
app.set('view engine', 'ejs');
app.use(expressEjsLayouts);

// Middleware
app.use(morgan('dev'))//muestra el tiempo q tarda el req
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuración de la sesión
app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: false,
}));

// Rutas
app.use('/', indexRouter);
// Rutas
app.use('/admin', dashboardRouter);

// Conexión a la base de datos
connectDB();

// Configuración y middleware de flash
configureFlash(app);

// Puerto y inicio del servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`La aplicación está escuchando en el puerto ${port}`);
});