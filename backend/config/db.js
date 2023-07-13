import mongoose from 'mongoose';

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

export default connectDB;