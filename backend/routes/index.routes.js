import express from 'express';
import libroController from '../controllers/libroController.js';

const router = express.Router();

router.get('/',async (req,res)=>{
    try {
        const libros = await libroController.obtenerLibros()
        res.render('pages/home.ejs',{title: 'BookStore | Home', libros:libros})
    } catch (error) {
        console.log(error.mensaje)
        res.status(500).json({mensaje:"Error interno del sistema"})
    }
})

export default router;