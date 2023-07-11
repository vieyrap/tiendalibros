import express from 'express'
import passport from 'passport';
// import Cart from '../models/cart.js';
import User from '../models/user.js'
import Libro from '../models/libro.js';

const router = express.Router()

// Middleware para verificar la autenticación del usuario
function isAuthenticatedUser(req, res) {
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
    User.register(new User({
        nombre,
        apellido,
        email
    }),
    password,
    (err, user) => {
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
router.post('/login', passport.authenticate('local', {
    successRedirect: '/favoritos',
    failureRedirect: '/login',
    failureFlash: true
}));

//Cerrar sesion
router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
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
router.get('/favoritos',isAuthenticatedUser,(req,res,next)=>{
    res.render('users/favoritos.ejs',{
        title: 'Favoritos', 
        layout: 'layouts/layout'})
})

//Carrito de compras
router.get('/carrito-compras',async(req,res,next)=>{
    try {
        if (!req.session.cart) {
            return res.render('users/carrito-compras',{
                title:'Carrito de Compras', 
                layout: 'layouts/layout', 
                libros : null})
        } else{
        // console.log(req.session.cart.items)
        const cart = await new Cart(req.session.cart)       
        const libros=Object.values(cart.items);//Obtengo array de libros
        console.log(cart)
        res.render('users/carrito-compras',{
            title:'Carrito de Compras', 
            layout: 'layouts/layout', 
            libros : libros, 
            precioTotal: cart.precioTotal, 
            cantidadTotal: cart.cantidadTotal})
    }
    } catch (error) {
        console.log(error.mensaje)
        res.status(500).json({mensaje:"error interno del sistema"})
    }
})

//Agregar carrito
router.get('/agregar-carrito/:isbn',async (req,res)=>{
    try {
        const libro = await Libro.findOne({isbn:req.params.isbn})
        const cart = new Cart(req.session.cart ? req.session.cart : {})
        cart.add(libro, libro.id)
        req.session.cart = cart
        res.redirect('/login')
        
    } catch (error) {
        console.log(error.mensaje)
        res.status(500).json({mensaje:"Error interno del sistema"})
    }
})

//Checkout
router.get('/checkout',(req,res,next)=>{
    res.render('users/checkout.ejs')
})



export default router