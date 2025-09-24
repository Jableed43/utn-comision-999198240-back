import express from 'express'
import { createUser, deleteUser, getUsers, updateUser, validate } from '../controllers/userController.js'
import {verifyTokenMiddleware} from '../middlewares/verifyTokenMiddleware.js'
// Creamos el enrutador
// Controla el conjunto de las rutas
// Orienta a una entidad

export const userRoute = express.Router()

// Los endpoints -> http://localhost:3000/api/user/create

//Endpoints
// Verbo http +  path + controller + service
userRoute.post("/create", createUser)
userRoute.get("/getUsers", getUsers)
userRoute.delete("/deleteUser/:id", deleteUser)
userRoute.patch("/updateUser/:id", updateUser)
userRoute.post("/login", validate)
