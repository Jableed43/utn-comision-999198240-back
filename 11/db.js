// Mongoose es nuestro ODM
// object document mapping
import mongoose from 'mongoose'
import { MONGODB_URI, UTN_DB } from './config.js'

// Crear la conexion a la base de datos

export const connectDB = async () => {
    try {
        // Validar que las variables de entorno estén definidas
        if (!MONGODB_URI) {
            throw new Error('MONGODB_URI no está definida en las variables de entorno')
        }
        if (!UTN_DB) {
            throw new Error('UTN_DB no está definida en las variables de entorno')
        }

        // Pequeño delay para dar tiempo a que MongoDB inicie (especialmente en Docker)
        await new Promise(resolve => setTimeout(resolve, 3000))
        
        // Nos conectamos a la URI de mongoDB
        // En Docker: mongodb://mongo:27017
        // En local: mongodb://127.0.0.1:27017
        const connectionString = `${MONGODB_URI}/${UTN_DB}`
        console.log(`Intentando conectar a: ${MONGODB_URI}/${UTN_DB}`)
        
        await mongoose.connect(connectionString)
        console.log("✅ Database connected successfully")
    } catch (error) {
        console.error("❌ Error connecting to database:", error.message)
        // Reintentar después de 5 segundos
        console.log("🔄 Reintentando conexión en 5 segundos...")
        setTimeout(connectDB, 5000)
    }
}