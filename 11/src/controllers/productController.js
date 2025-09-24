import { createProductService, deleteProductService, findProductByIdService, findProductByNameService, getProductsService, getStatusService, updateProductService } from "../services/productService.js"

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
        if(error.statusCode === 204){
            return res.sendStatus(204)
        }
        if(error.statusCode === 400){
            return res.status(400).json({ message: error.message })
        }
        return res.status(500).json({message: "internal server error", error: error.message})
    }
}

export const findProductByName = async (req, res) => {
    try {
        const product = await findProductByNameService(req.body.name)
        return res.status(200).json(product)
    } catch (error) {
        if(error.statusCode === 400){
            return res.status(400).json({message: error.message})
        }
        return res.status(500).json({message: "Internal server error", error: error.message})
    }
}

export const findProductById = async (req, res) => {
    try {
        const product = await findProductByIdService(req.params.id)
        return res.status(200).json(product)
    } catch (error) {
        if(error.statusCode === 400){
            return res.status(400).json({message: error.message})
        }
        return res.status(500).json({message: "Internal server error", error: error.message})
    }
}

export const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const updatedProduct = await updateProductService(productId, req.body)
        res.status(201).json(updatedProduct)
    } catch (error) {
        if(error.statusCode === 400){
            return res.status(400).json({message: error.message})
        }
        return res.status(500).json({message: "Internal server error", error: error.message})
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await deleteProductService(productId)
        res.status(201).json(deletedProduct)
    } catch (error) {
        if(error.statusCode === 400){
            return res.status(400).json({message: error.message})
        }
        return res.status(500).json({message: "Internal server error", error: error.message})
    }
}

export const getStatus = async (req, res) => {
    try {
        const status = await getStatusService()
        return res.status(200).json(status)
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message })
    }
}