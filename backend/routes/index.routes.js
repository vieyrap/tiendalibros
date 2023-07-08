import express from 'express';
import libroController from '../controllers/libroController.js';

const router = express.Router();

//Vista Home | Tendencias, Ofertas, Proximamente
router.get('/',async (req,res)=>{
    try {
        const libros = await libroController.obtenerLibros()
        res.render('pages/home.ejs',{
            title: 'Home', 
            layout: 'layouts/layout', 
            libros:libros})
    } catch (error) {
        console.log(error.mensaje)
        res.status(500).json({mensaje:"Error interno del sistema"})
    }
})

//Vista Nosotros
router.get('/nosotros',async (req,res)=>{
    try {
        res.render('pages/nosotros.ejs',{title: 'Nosotros', layout: 'layouts/layout'})
    } catch (error) {
        console.log(error.mensaje)
        res.status(500).json({mensaje:"Error interno del sistema"})
    }
})

//Vista Libros | Editoriales, categorias y autores
router.get('/libros',async (req,res)=>{
    try {
        const libros = await libroController.obtenerLibros()
        const editoriales = await libroController.obtenerEditoriales()
        const categorias = await libroController.obtenerCategorias()
        const autores = await libroController.obtenerAutores()        
        res.render('pages/libros.ejs',{
            title: 'Libros', 
            layout: 'layouts/layout', 
            libros:libros,
            editoriales:editoriales,
            categorias:categorias,
            autores:autores
        })
    } catch (error) {
        console.log(error.mensaje)
        res.status(500).json({mensaje:"Error interno del sistema"})
    }
})

//Vista Buscador 
router.get('/buscador',async (req,res)=>{
    try {
        const libros = await libroController.obtenerLibros()
        res.render('pages/buscador.ejs',{title: 'Buscador', layout: 'layouts/layout', libros:{}})
    } catch (error) {
        console.log(error.mensaje)
        res.status(500).json({mensaje:"Error interno del sistema"})
    }
})

//Vista Buscador | Obtener criterio de busqueda y mostrar resultados
router.post('/buscador',async (req,res)=>{
    try {
        const busqueda = req.body.busqueda;
        const resultados = await libroController.buscarLibros(busqueda)
        res.render('pages/buscador.ejs',{title: 'Buscador', layout: 'layouts/layout', libros:resultados})
    } catch (error) {
        console.log(error.mensaje)
        res.status(500).json({mensaje:"Error interno del sistema"})
    }
})

export default router;