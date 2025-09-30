import express from 'express'
import { 
    createProductView, 
    createProduct, 
    getAllProductsView, 
    updateProductView, 
    updateProduct, 
    deleteProduct 
} from '../controllers/productController.js'

export const productRoute = express.Router()

// Ruta de redirección para "back"
productRoute.get("/back", (req, res) => {
    res.redirect("/product/getAll")
})

productRoute.get("/create", createProductView)
productRoute.get("/getAll", getAllProductsView)
productRoute.get("/update/:id", updateProductView)
productRoute.post("/create", createProduct)
productRoute.patch("/update/:id", updateProduct)
productRoute.delete("/delete/:id", deleteProduct)