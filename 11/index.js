import express from 'express'
import bodyParser from 'body-parser'
import { connectDB } from './db.js'
import { PORT } from './config.js'
import { userRoute } from './src/routes/userRoute.js'

// Instancia del servidor de express
const app = express()
// Conexion a la base de datos
connectDB()

//Con app.use aplicamos metodos de dependencias en nuestro servidor

// Middlewares -> Software del medio - Entre dos sistemas
// Parsear a json las solicitudes
app.use(bodyParser.json())

// Parsear el cuerpo de la solicitud para que pueda ser leida
app.use(bodyParser.urlencoded({extended: true}))


//Rutas base - Agrupa las rutas de un recurso
app.use("/api/user", userRoute)

// Crear la escucha del servidor, para hacerlo correr
app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`)
})
