import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import bodyParser from 'body-parser';
import morgan from "morgan"
import session from 'express-session';
import passport from 'passport';
import './backend/config/passport.js';
import expressEjsLayouts from 'express-ejs-layouts';
import configureFlash from './backend/config/flash.js'
import connectDB from './backend/config/db.js';
import indexRouter from './backend/routes/index.routes.js';
import userRouter from './backend/routes/user.routes.js'
import dashboardRouter from './backend/routes/dashboard.routes.js';

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

//Passport
app.use(passport.initialize())
app.use(passport.session())


//Variables globales
app.use(function (req, res,next){
    res.locals.currentUser = req.user;
    next();
})

// Configuración y middleware de flash
configureFlash(app);

// Rutas Generales
app.use(indexRouter);

// Rutas Usuarios
app.use(userRouter);

// Rutas Backend
app.use('/admin', dashboardRouter);

//Cualquier url no definida envia este mensaje
app.get('/*', (req,res)=>{
    res.status(404).json({mensaje:'La pagina no funciona'})
})//(http://localhost:3030/pedro)

// Conexión a la base de datos
connectDB();

// Puerto y inicio del servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`La aplicación está escuchando en el puerto ${port}`);
});