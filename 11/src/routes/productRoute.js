import express from 'express'
import { createProduct, getProducts } from '../controllers/productController.js'

export const productRoute = express.Router()

//Endpoints

productRoute.get("/", getProducts)
productRoute.post("/create", createProduct)