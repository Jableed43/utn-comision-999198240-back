import { createProductService, getProductsService } from "../services/productService.js"

export const createProduct = async (req, res) => {
    try {
        const savedProduct = await createProductService(req.body)
        return res.status(200).json(savedProduct)
    } catch (error) {
        return res.status(500).json({message: "internal server error", error: error.message})
    }
}

export const getProducts = async (req, res) => {
    try {
        const products = await getProductsService()
        return res.status(200).json(products)
    } catch (error) {
        if(error.statusCode === 400){
            return res.status(400).json({ message: error.message })
        }
        return res.status(500).json({message: "internal server error", error: error.message})
    }
}