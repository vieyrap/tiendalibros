import express from 'express';
import libroController from '../controllers/libroController.js';
import Admin from '../models/admin.js'

const router = express.Router();

router.get('/dashboard', (req, res) => {
    res.render('dashboard', { title: 'BookStore | Dashboard', layout: 'layouts/layoutBack'});
});

export default router;