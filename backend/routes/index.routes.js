import express from 'express';
import libroController from '../controllers/libroController.js';

const router = express.Router();

router.get('/',async (req,res)=>{
    try {
        const libros = await libroController.obtenerLibros()
        res.render('pages/home.ejs',{title: 'Home', layout: 'layouts/layout', libros:libros})
    } catch (error) {
        console.log(error.mensaje)
        res.status(500).json({mensaje:"Error interno del sistema"})
    }
})

router.get('/nosotros',async (req,res)=>{
    try {
        const libros = await libroController.obtenerLibros()
        res.render('pages/nosotros.ejs',{title: 'Nosotros', layout: 'layouts/layout'})
    } catch (error) {
        console.log(error.mensaje)
        res.status(500).json({mensaje:"Error interno del sistema"})
    }
})

router.get('/libros',async (req,res)=>{
    try {
        const libros = await libroController.obtenerLibros()
        res.render('pages/libros.ejs',{title: 'Libros', layout: 'layouts/layout', libros:libros})
    } catch (error) {
        console.log(error.mensaje)
        res.status(500).json({mensaje:"Error interno del sistema"})
    }
})

router.get('/buscador',async (req,res)=>{
    try {
        const libros = await libroController.obtenerLibros()
        res.render('pages/buscador.ejs',{title: 'Buscador', layout: 'layouts/layout', libros:libros})
    } catch (error) {
        console.log(error.mensaje)
        res.status(500).json({mensaje:"Error interno del sistema"})
    }
})

router.post('/buscador/:id ',async (req,res)=>{
    try {
        const libros = await libroController.obtenerLibros()
        res.render('pages/buscador.ejs',{title: 'Buscador', layout: 'layouts/layout', libros:libros})
    } catch (error) {
        console.log(error.mensaje)
        res.status(500).json({mensaje:"Error interno del sistema"})
    }
})

export default router;