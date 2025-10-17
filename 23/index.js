import express from 'express'
import { connectDB } from './db.js'
import { PORT } from './config.js'
import cors from 'cors'
import bodyParser from 'body-parser'
import { userRoute } from './src/routes/userRoute.js'
import {categoryRoute} from "./src/routes/categoryRoute.js"
import { productRoute } from './src/routes/productRoute.js'

// Creamos la aplicacion express
const app = express()

// Cors permite recibir solicitudes de origenes cruzados
app.use(cors({
    origin: '*',
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
}))

// Conexion a la base de datos
connectDB()

// PARSEAR A JSON LAS SOLICITUDES
app.use(bodyParser.json())

// Parsea el cuerpo de las solicitudes para que puedan ser leidas
app.use(bodyParser.urlencoded({extended: true}))

// Rutas
app.use("/api/user", userRoute)
app.use("/api/category", categoryRoute)
app.use("/api/product", productRoute)



// Levantamos el servidor
app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`)
})