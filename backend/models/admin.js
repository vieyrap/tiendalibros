import mongoose, { Schema,model } from "mongoose";
import passportLocalMongoose from 'passport-local-mongoose'

let adminScheme=new Schema({
    nombre:String,
    apellido:String,
    email:String,
    password:String
})

adminScheme.plugin(passportLocalMongoose,{usernameField:'email'})

export default model('Admin',adminScheme)