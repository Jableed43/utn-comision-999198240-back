import express from 'express'
import { 
    createPurchase, 
    getPurchasesByUser, 
    getPurchaseById, 
    getAllPurchases 
} from '../controllers/purchaseController.js'
import { verifyTokenMiddleware } from '../middlewares/verifyTokenMiddleware.js'

export const purchaseRoute = express.Router()

// Endpoints protegidos con autenticación

// Crear una nueva compra
purchaseRoute.post("/create", createPurchase)

// Obtener compras por usuario
purchaseRoute.get("/user/:userId", getPurchasesByUser)

// Obtener compra por ID
purchaseRoute.get("/:purchaseId", getPurchaseById)

// Obtener todas las compras (para administradores)
purchaseRoute.get("/", getAllPurchases)
