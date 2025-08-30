import express from 'express'
import { connectDB } from './db';
import bodyParser from 'body-parser';

//Parsear a json las solicitudes
app.use(bodyParser.json())

//Parsear el cuerpo de la solicitud para que pueda ser leida
app.use(bodyParser.urlencoded({extended: true}))

// Crea una instancia de servidor de express
const app = express();

// Conexion a la base de datos
connectDB();

// Crear la escucha del servidor para hacerlo correr

app.listen(3000, () => {
    console.log(`Server running at 8080`)
})

