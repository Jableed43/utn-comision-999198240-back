import { orderBy } from "firebase/firestore";
import { dbFirebase } from "../../firebase.js";
import { createPurchaseService, getAllPurchasesService, getPurchaseByIdService, getPurchasesByUserService } from "../services/purchaseService.js";

// Crear una nueva compra
export const createPurchase = async (req, res) => {
    try {
       const purchase = await createPurchaseService(req.body)
       return res.status(201).json({
        message: "Purchase created successfully",
        data: purchase
       })
    } catch (error) {
        console.error("Error creating purchase", error)
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

export const getPurchasesByUser = async (req, res) => {
    try {
       const userId = req.params.userId
       const purchases = await getPurchasesByUserService(userId)
       return res.status(200).json(purchases)
    } catch (error) {
        if(error.statusCode === 204){
            return res.status(204)
        }
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

export const getPurchaseById = async (req, res) => {
    try {
        const purchaseId = req.params.purchaseId
        const purchase = await getPurchaseByIdService(purchaseId)
        return res.status(200).json(purchase)
    } catch (error) {
        if(error.statusCode === 404){
            return res.status(404)
        }
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

export const getAllPurchases = async (req, res) => {
    try {
        const purchases = await getAllPurchasesService()
        return res.status(200).json(purchases)
    } catch (error) {
        if (error.statusCode === 204) {
            return res.status(204).json([])
        }
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}