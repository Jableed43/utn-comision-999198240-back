import mongoose from 'mongoose'
import { isGoodPassword } from '../utils/validators.js'
import bcrypt from 'bcrypt'

// Nos falta encriptacion de contraseña

// Creamos el esquema de usuario
const userSchema = new mongoose.Schema({
    // Nombres de los atributos
    name: {
        //Type es el tipo de dato
        type: String,
        // required es que el campo es obligatorio
        required: true,
        // max length es el maximo de caracteres
        maxlength: 20,
        // min length es el minimo de caracteres
        minlength: 2,
        // trim quita espacios adelante y atras
        trim: true,
        // pasa todo el dato a minuscula antes de guardarlo
        lowercase: true,
    },

    lastName: {
        type: String,
        required: true,
        maxlength: 20,
        minlength: 2,
        trim: true,
        lowercase: true
    },

    email: {
        type: String,
        required: true,
        maxlength: 30,
        minlength: 6,
        trim: true,
        lowercase: true,
        // Se asegura que el email no se repita
        unique: true,
        // Se asegura que sea un mail valido, con @, .
        match: /^\S+@\S+\.\S+$/, 
    },

    age: {
        type: Number,
        required: true,
        // Se asegura que un valor numerico sea minimo o maximo
        min: 16,
        max: 110,
    },

    password: {
        required: true,
        type: String,
        validate: {
            validator: function (value) {
                return isGoodPassword(value)
            },
            message: 
            "Password must be bewteen 6 and 12 characters, with at least one number, one uppercase letter and one lowercase letter"
        }
    }
}, {
    // Cuando se cree y cuando se modifique se guardaran en los campos createdAt, updatedAt
    timestamps: true} )

    // Encriptamos la password
    userSchema.pre("save", function (next) {
        // Encriptamos la password antes de guardarla
        this.password = bcrypt.hashSync(this.password, 10)
        next()
    } )

    // Exportamos el modelo
    // "user" es la coleccion con la que elijo trabajar
export default mongoose.model("user", userSchema)