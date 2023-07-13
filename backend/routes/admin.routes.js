import express from 'express';
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

router.get('/dashboard',isAuthenticatedAdmin,(req, res) => {
    res.render('pages/dashboard', { title: 'BookStore | Dashboard', layout: 'layouts/layoutBack'});
});



export default router;