import express from 'express'
import { createProduct, createProductView, deleteProduct, findProductById, findProductByName, getProducts, getStatus, updateProduct, updateProductView } from '../controllers/productController.js'

export const productRoute = express.Router()

//Endpoints

productRoute.post("/create", createProduct)
productRoute.post("/name", findProductByName)
productRoute.get("/find-by-id/:id", findProductById)
productRoute.patch("/update/:id", updateProduct)
productRoute.delete("/delete/:id", deleteProduct)
productRoute.get("/status", getStatus)

// Vistas
productRoute.get("/", getProducts)
productRoute.get("/update/:id", updateProductView)
productRoute.get("/create", createProductView)