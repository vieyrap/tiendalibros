import express from 'express'
const router = express.Router()
import passport from 'passport'
// import Cart from '../models/cart.js';
import Libro from '../models/libro.js';

//Vista Pagina de Registro
router.get('/registrar', (req, res, next) => {
    res.render('users/registrar',{title: 'BookStore | Registrar', layout: 'layouts/layout'});
});

//Obtener datos de Registro
router.post("/registrar",passport.authenticate("user-local-signup", {
    successRedirect: '/favoritos',
    failureRedirect: '/registrar',
    failureFlash: true,
}));

//Vista Pagina de Login
router.get("/login", (req, res, next) => {
    res.render("users/login",{title: 'Login', layout: 'layouts/layout'});
});

//Obtener datos de login
router.post("/login",passport.authenticate("user-local-signin", {
    successRedirect: "/favoritos",
    failureRedirect: "/login",
    failureFlash: true,
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
router.get('/favoritos',(req,res,next)=>{
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
router.get('/checkout',isAuthenticated,(req,res,next)=>{
    res.render('users/checkout.ejs')
})

function isAuthenticated(req, res, next) {
    console.log(req)
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash('error_msg','Por favor, logueate para ver la pagina')
    res.redirect('/login')
}


export default router