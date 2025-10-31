// Mongoose es nuestro ODM
// object document mapping
import mongoose from 'mongoose'
import { MONGODB_URI, UTN_DB } from './config.js'

// Crear la conexion a la base de datos

export const connectDB = async () => {
    try {
        // Nos conectamos a la URI de mongoDB
        // Localhost -> 127.0.0.1
        // MONGODB_URI -> mongodb://localhost:port y la database_name es UTN_DB
        if(!MONGODB_URI){
            throw new Error("MONGODB_URI no esta definida en las variables de entorno")
        }
        if(!UTN_DB){
            throw new Error("UTN_DB no esta definida en las variables de entorno")
        }

        // Le damos tiempo para que se mongo inicie
        await new Promise(resolve => setTimeout(resolve, 3000))

        const connectionString = `${MONGODB_URI}/${UTN_DB}`
        console.log(`Accediendo a ${MONGODB_URI}/${UTN_DB}`)
        
        await mongoose.connect(connectionString)
        console.log("Database connected")
    } catch (error) {
        console.error("Error connecting to database", error)
        setTimeout(connectDB, 5000)
    }
}