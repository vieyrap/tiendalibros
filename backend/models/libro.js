import { Schema,model } from "mongoose";

const LibroSchema = new Schema({
    isbn:String,
    titulo:String,
    autor:String,
    resumen:String,
    editorial:String,
    imagen:String,
    precio:Number,
    categoria:String,
    fecha_publicacion:String,
    precio_oferta:Number,
    tendencia:Boolean,
    proximamente:Boolean
});

export default model("Libro", LibroSchema)