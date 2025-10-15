import express from 'express'
import { connectDB } from './db'
import { PORT } from './config'
import cors from 'cors'
import bodyParser from 'body-parser'

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

// Levantamos el servidor
app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`)
})