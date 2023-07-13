
import User from "../models/user.js";
import Cart from '../models/cart.js';
import Libro from '../models/libro.js';

async function agregarCarrito (cartSession, isbn) { 
    try {
        const libro = await Libro.findOne({ isbn: isbn });
        const cart = new Cart(cartSession ? cartSession : {});
        cart.add(libro, libro.id);
        return cart

    } catch (error) {
        throw new Error('Error al agregar al carrito:', error);
    }
}

export default {
    agregarCarrito
}