import express from 'express'
import passport from 'passport';
import Cart from '../models/cart.js';
import Libro from "../models/libro.js";
import User from '../models/user.js'
import userController from '../controllers/userController.js';
import cart from '../models/cart.js';

const router = express.Router()

// Middleware para verificar la autenticación del usuario
function isAuthenticatedUser(req, res,next) {
    if (req.isAuthenticated() && req.user instanceof User) {
        return next();
    }
    req.flash('error_msg','Debes esta iniciar sesion para acceder')
    return res.redirect('/login');
}

//Vista de Registro
router.get('/registrar', (req, res, next) => {
    res.render('users/registrar',{title: 'BookStore | Registrar', layout: 'layouts/layout'});
});

// Ruta de registro para usuarios
router.post('/registrar', (req, res) => {
    const { nombre, apellido, email, password } = req.body;
    User.register(new User({nombre, apellido, email}), password, (err, user) => {
        if (err) {
            // Manejo de errores de registro
            req.flash('error_msg','Error',err)
            res.redirect('/registrar')
        }
        // Registro exitoso
        req.flash('success_msg','Cuenta creada')
        res.redirect('/login');
    });
});

//Vista de Login
router.get("/login", (req, res, next) => {
    res.render("users/login",{title: 'Login', layout: 'layouts/layout'});
});

//Obtener datos de login
router.post('/login', passport.authenticate('user-local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

//Cerrar sesion
router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success_msg','Se cerro la sesion')
        res.redirect('/login');
    });
});

//Recuperar contraseña
router.get('/recuperar',(req,res,next)=>{

    res.render('users/recuperar.ejs',{
        title: 'Recuperar', 
        layout: 'layouts/layout'})
})

//Favortios
router.get('/favoritos',isAuthenticatedUser,(req,res)=>{
    res.render('users/favoritos.ejs',{
        title: 'Favoritos', 
        layout: 'layouts/layout'})
})

//Carrito de compras
router.get('/carrito-compras',isAuthenticatedUser,async(req,res)=>{
    try {
        if (!req.session.cart) {
            return res.render('users/carrito-compras',{
                title:'Carrito de Compras', 
                layout: 'layouts/layout', 
                libros : null})
        } else{
        
        const cart = await new Cart(req.session.cart)       
        const libros = Object.values(cart.items);//Obtengo array de libros

        res.render('users/carrito-compras',{
            title:'Carrito de Compras', 
            layout: 'layouts/layout', 
            libros : libros, 
            precioTotal: cart.precioTotal, 
            cantidadTotal: cart.cantidadTotal})
    }
    } catch (error) {
        res.status(500).json({mensaje:"error interno del sistema"})
    }
})

//Agregar carrito
router.get('/agregar-carrito/:isbn', isAuthenticatedUser, async (req, res) => {
    try {
        const libro = await Libro.findOne({isbn:req.params.isbn})
        const cart = new Cart(req.session.cart ? req.session.cart : {})
        cart.add(libro, libro.id)
        req.session.cart = cart
        const refererURL = req.headers.referer;// Obtener la URL de referencia del encabezado de la solicitud
        res.redirect(req.headers.referer + '#prueba-'+req.params.isbn);
        } catch (error) {
        res.status(500).json({ mensaje: "Error interno del sistema" });
    }
});

router.get('/reducir/:id', async (req, res) =>{
    try {
        const libroId = req.params.id
        console.log(libroId)
        const cart = await new Cart(req.session.cart ? req.session.cart : {})
        cart.reduceByOne(libroId)
        req.session.cart = cart
        if(cart.cantidadTotal === 0){
            req.session.cart = undefined
        } else{
            req.session.cart = cart
        }

        res.redirect('/carrito-compras')
    } catch (error) {
        res.status(500).json({ mensaje: "Error interno del sistema" + error });
    }
    
})

router.get('/eliminar/:id', async (req, res) =>{
    try {
        const libroId = req.params.id
        const cart = await new Cart(req.session.cart ? req.session.cart : {})
        cart.eliminarItem(libroId)
        req.session.cart = cart
        if(cart.cantidadTotal === 0){
            req.session.cart = undefined
        } else{
            req.session.cart = cart
        }
        res.redirect('/carrito-compras')
    } catch (error) {
        res.status(500).json({ mensaje: "Error interno del sistema" + error });
    }
    
})

//Checkout
router.get('/checkout', isAuthenticatedUser,(req,res,next)=>{
    res.render('users/checkout.ejs',{
        title:'Checkout', 
        layout: 'layouts/layout'})
})

export default router