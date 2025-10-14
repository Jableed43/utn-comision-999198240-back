import express from 'express'
import { createProduct, deleteProduct, findProductById, findProductByName, getProductImageUrl, getProducts, getStatus, updateProduct } from '../controllers/productController.js'
import { upload, uploadProductImage } from '../middlewares/uploadMiddleware.js'

export const productRoute = express.Router()

//Endpoints

productRoute.get("/", getProducts)
productRoute.post("/create", upload.single("image"), uploadProductImage, createProduct)
productRoute.post("/name", findProductByName)
productRoute.get("/find-by-id/:id", findProductById)
productRoute.put("/update/:id", upload.single("image"), uploadProductImage, updateProduct)
productRoute.delete("/delete/:id", deleteProduct)
productRoute.get("/status", getStatus)
productRoute.get("/:id/image", getProductImageUrl)
