import express from 'express'
import { 
    createUserView, 
    createUser, 
    getAllUsersView, 
    updateUserView, 
    updateUser, 
    deleteUser, 
    loginView, 
    validate, 
    logout 
} from '../controllers/userController.js'

export const userRoute = express.Router()

// ===== RUTAS DE VISTAS =====
userRoute.get("/create", createUserView)
userRoute.get("/login", loginView)
userRoute.get("/getAll", getAllUsersView)
userRoute.get("/update/:id", updateUserView)

// ===== RUTAS DE ACCIONES =====
userRoute.post("/create", createUser)
userRoute.post("/login", validate)
userRoute.patch("/update/:id", updateUser)
userRoute.delete("/delete/:id", deleteUser)
userRoute.get("/logout", logout)
