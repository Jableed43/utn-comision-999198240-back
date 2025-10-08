import express from 'express'
import { createPurchase, getAllPurchases, getPurchaseById, getPurchasesByUser } from '../controllers/purchaseController.js' 

export const purchaseRoute = express.Router()

// Endpoints

purchaseRoute.post("/create", createPurchase)
purchaseRoute.get("/user/:userId", getPurchasesByUser)
purchaseRoute.get("/:purchaseId", getPurchaseById)
purchaseRoute.get("/", getAllPurchases)