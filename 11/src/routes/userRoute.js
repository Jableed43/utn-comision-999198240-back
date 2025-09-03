import express from 'express'
import { createUser } from '../controllers/userController.js'

// Creamos el enrutador
// Controla el conjunto de las rutas
// Orienta a una entidad

export const userRoute = express.Router()

// Los endpoints -> http://localhost:3001/api/user/create

//Endpoints
userRoute.post("/create", createUser)