import mongoose, { Schema,model } from "mongoose";
import passportLocalMongoose from 'passport-local-mongoose'

let userScheme=new Schema({
    nombre:String,
    apellido:String,
    email:String,
    password:String
})
userScheme.plugin(passportLocalMongoose,{usernameField:'email'})

export default model('User',userScheme)