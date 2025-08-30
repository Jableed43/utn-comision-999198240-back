// Mongoose es nuestro ODM
// object document mapping
import mongoose from 'mongoose'

// Crear la conexion a la base de datos

export const connectDB = async () => {
    try {
        // Nos conectamos a la URI de mongoDB
        // Localhost -> 127.0.0.1
        // "mongodb://127.0.0.1:PORT/DATABASE_NAME"
        await mongoose.connect("mongodb://127.0.0.1:27017/utn2608")
        console.log("Database connected")
    } catch (error) {
        console.error("Error connectecting to database", error)
        // Si falla tenemos que salir de la ejecucion
        process.exit(1)
    }
}