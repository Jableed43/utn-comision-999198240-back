import express from 'express'
import { createUser, deleteUser, getUserById, getUsers, updateUser } from "../controllers/userController.js"


export const userRoute = express.Router()

// Endpoints
userRoute.get("/", getUsers)
userRoute.get("/:id", getUserById)
userRoute.post("/create", createUser)
userRoute.patch("/update/:id", updateUser)
userRoute.delete("/delete/:id", deleteUser)

