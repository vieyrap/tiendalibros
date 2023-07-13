import mongoose from 'mongoose';
import Admin from '../models/admin.js'

const connectDB = async () => {
    try {
        const connection = await mongoose.connect('mongodb+srv://vieyrap:Hola1234@cluster0.uxsur.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        });

        console.log(`Conectado a la base de datos: ${connection.connection.host}`);
    } catch (error) {
        console.error(`Error al conectar a la base de datos: ${error.message}`);
        process.exit(1);
    }
};
// Crea el usuario administrador por defecto
const createDefaultAdmin = async () => {
    try {
        const existingAdmin = await Admin.findOne({ username: 'admin' });
        if (existingAdmin) {
            console.log('El usuario administrador por defecto ya existe en la base de datos.');
            return;
        }
        const admin = new Admin({
            nombre: 'Admin',
            apellido: 'Admin',
            email: 'admin@admin.com'
        });
        await Admin.register(admin, 'password');
        console.log('Usuario administrador por defecto creado exitosamente.');
    } catch (error) {
        console.error('Error al crear el usuario administrador por defecto:', error);
    }
};

//createDefaultAdmin()
export default connectDB;