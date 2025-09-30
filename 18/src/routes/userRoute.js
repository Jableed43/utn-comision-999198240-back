import express from 'express'
import { 
    createUserView, 
    createUser, 
    loginView, 
    validate, 
    getAllUsersView, 
    updateUserView, 
    updateUser, 
    deleteUser, 
    logout 
} from '../controllers/userController.js'

export const userRoute = express.Router()

// Vistas
userRoute.get("/create", createUserView)
userRoute.get("/login", loginView)
userRoute.get("/getAll", getAllUsersView)
userRoute.get("/update/:id", updateUserView)

// Acciones
userRoute.post("/create", createUser)
userRoute.post("/login", validate)
userRoute.patch("/update/:id", updateUser)
userRoute.delete("/delete/:id", deleteUser)
userRoute.get("/logout", logout)