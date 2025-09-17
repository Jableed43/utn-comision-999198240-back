import express from 'express'
import { createProduct, deleteProduct, findProductById, findProductByName, getProducts, getStatus, updateProduct } from '../controllers/productController.js'

export const productRoute = express.Router()

//Endpoints

productRoute.get("/", getProducts)
productRoute.post("/create", createProduct)
productRoute.post("/name", findProductByName)
productRoute.get("/find-by-id/:id", findProductById)
productRoute.put("/update/:id", updateProduct)
productRoute.delete("/delete/:id", deleteProduct)
productRoute.get("/status", getStatus)