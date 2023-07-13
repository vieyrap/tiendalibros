import express from 'express';
import passport from 'passport';
import libroController from '../controllers/libroController.js';
import Admin from '../models/admin.js'

const router = express.Router();

// Middleware para verificar la autenticación del administrador
function isAuthenticatedAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user instanceof Admin) {
        return next();
    }
    res.redirect('/admin/login');
}

router.get('/login',(req, res) => {
    res.render('pages/login', { 
        title: 'BookStore | Admin', 
        layout: 'layouts/layoutBack'});
});

//Obtener datos de login
router.post('/login', passport.authenticate('admin-local', {
    successRedirect: '/admin/dashboard',
    failureRedirect: '/admin/login',
    failureFlash: true
}));

router.get('/dashboard',isAuthenticatedAdmin,(req, res) => {
    res.render('pages/dashboard', { title: 'BookStore | Dashboard', layout: 'layouts/layoutBack'});
});

export default router;