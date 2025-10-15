import mongoose from 'mongoose'
import { MONGODB_URI, DB } from './config.js'

// Creamos la conexion de la base de datos
export const connectDB = async () => {
    try {
        await mongoose.connect(`${MONGODB_URI}/${DB}`)
    } catch (error) {
        console.error("Error connecting to database", error)
        // Para salir de la ejecucion de la aplicacion (express)
        process.exit(1)
    }
}