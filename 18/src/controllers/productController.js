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
        /* con render renderizamos un archivo, que seria una view */
        return res.render("product/getAllProducts", { products })
    } catch (error) {
        return res.status(500).render("500", { message: error })
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

/* Todo para seguir en la proxima clase */
export const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product  = await updateProductService(productId, req.body)
        const idString = productId.toString()
        res.render("product/updateProduct", {
            product,
            idString
        })
    } catch (error) {
        return res.status(500).render("500", { message: error })
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