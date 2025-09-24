import { SECRET } from "../../config.js";
import User from "../models/userModel.js"
import { findUserByIdAndCheck } from "../utils/userHelpers.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
// Creamos el usuario

export const createUserService = async (userData) => {

    const userExists = await User.findOne({ email: userData.email });

    if(userExists){
        throw new Error("User with this email aready exists")
    }
    // Creamos el user
    const newUser = new User(userData);
    // Save
    await newUser.save()

    return { message: "User created" }
}

// Obtener todos los usuarios
export const getUsersService = async () => {
   const users = await User.find()
    // Validacion x si no hay usuarios
   if(users.length === 0){
    // Armando el error con su mensaje y su codigo de estado
    const error = new Error("There are no users")
    error.statusCode = 204
    throw error
   }

   return users
}

// Borrar el usuario
export const deleteUserService = async (userId) => {
    // Validar
    await findUserByIdAndCheck(userId)
    
    await User.findByIdAndDelete(userId)
    return { message: "User deleted succesfully" }
}

// Actualizar usuario
export const updateUserService = async (userId, updateData) => {
    await findUserByIdAndCheck(userId)

    // new true devuelve el documento modificado y actualizado
    // Si no lo pones te devuelve el documento viejo
    const updatedUser = await User.findByIdAndUpdate({ _id: userId  }, updateData, {new: true} )
    
    return updatedUser;
}

// Validamos el usuario
export const validateUserService = async (email, password) => {
    console.log({email, password})
    // Validar que ambos campos existan y sean correctos
    if(!(email && password)){
       const error = new Error("There's a missing field")
       error.statusCode = 400;
       throw error
    }
    // El email es unico y es un identificador de usuario
   const userFound = await User.findOne({email})
   console.log(userFound)

   if(!userFound){
        const error = new Error("User or password are incorrect")
       error.statusCode = 400;
       throw error
   }

   // Comparamos la password que llega contra la guardada en la db
   // Toma la contraseña del cliente la encripta y la compara contra la guardada (encriptada)
   if(!bcrypt.compareSync(password, userFound.password)){
        const error = new Error("User or password are incorrect")
       error.statusCode = 400;
       throw error
   }

   // Generamos el payload
   // Es la informacion que guardamos en el token
   const payload = {
    userId: userFound._id,
    userEmail: userFound.email
   }

   // El token debe ser firmado para tener validez
   // Firma tiene: 1. payload, 2. "secret", 3. duracion
   const token = jwt.sign(payload, SECRET, { expiresIn: "1h" })

   return { message: "Logged in", token }

}