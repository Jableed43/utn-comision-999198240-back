import express from 'express'
import bodyParser from 'body-parser'
import { connectDB } from './db.js'
import { PORT, SECRET } from './config.js'
import { userRoute } from './src/routes/userRoute.js'
import session from 'express-session'
import { categoryRoute } from './src/routes/categoryRoute.js'
import { productRoute } from './src/routes/productRoute.js'
import cors from 'cors'

// Instancia del servidor de express
const app = express()

// Cors sirve para que el backend pueda recibir solicitudes del frontend
app.use(cors({
    // Permitimos todas las conexiones de cualquier ip:puerto
    origin: "*",
    // Decidimos cuales metodos son permitidos
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
}))

// Conexion a la base de datos
connectDB()

//Con app.use aplicamos metodos de dependencias en nuestro servidor

// Middlewares -> Software del medio - Entre dos sistemas
// Parsear a json las solicitudes
app.use(bodyParser.json())

// Parsear el cuerpo de la solicitud para que pueda ser leida
app.use(bodyParser.urlencoded({extended: true}))

// Generamos el uso de la sesion
app.use(
    session({
        secret: SECRET, // Dato unico de nuestro sistema
        resave: false, // Evita que la sesion se vuelva a guardar si no hay datos
        saveUninitialized: false, // Evita que se guarde una sesion no inicializada
    })
)

//Rutas base - Agrupa las rutas de un recurso
app.use("/api/user", userRoute)
app.use("/api/category", categoryRoute)
app.use("/api/product", productRoute)

// Crear la escucha del servidor, para hacerlo correr
app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`)
})
