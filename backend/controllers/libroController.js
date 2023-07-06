
import Libro from "../models/libro.js";

// Función para crear un nuevo libro
export async function crearLibro(req, res) {
    try {
        const libroData = req.body;
        const nuevoLibro = await Libro.create(libroData);
        res.status(201).json(nuevoLibro);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el libro', error });
        }
}

// Función para obtener todos los libros
async function obtenerLibros() {
    try {
        const libros = await Libro.find({});
        console.log(libros)
        return libros
    } catch (error) {
        throw new Error('Error al obtener los libros');
        }
}

  // Función para obtener un libro por su ID
async function obtenerLibroPorId(req, res) {
    try {
        const { id } = req.params;
        const libro = await Libro.findById(id);
        if (libro) {
        res.json(libro);
        } else {
        res.status(404).json({ message: 'Libro no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el libro', error });
    }
}

  // Función para actualizar un libro
async function actualizarLibro(req, res) {
    try {
        const { id } = req.params;
        const libroData = req.body;
        const actualizadoLibro = await Book.findByIdAndUpdate(id, libroData, { new: true });
        if (actualizadoLibro) {
        res.json(actualizadoLibro);
        } else {
        res.status(404).json({ message: 'Libro no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el libro', error });
    }
}

  // Función para eliminar un libro
async function eliminarLibro(req, res) {
    try {
        const { id } = req.params;
        const eliminarLibro = await Libro.findByIdAndRemove(id);
        if (eliminarLibro) {
        res.json({ message: 'Libro eliminado exitosamente' });
        } else {
        res.status(404).json({ message: 'Libro no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el libro', error });
    }
}

export default{
    crearLibro,
    obtenerLibros,
    obtenerLibroPorId,
    actualizarLibro,
    eliminarLibro

}