import { deleteImageFromS3, generateSignedUrl } from "../services/imageService.js"
import { createProductService, deleteProductService, findProductByIdService, findProductByNameService, getProductsService, getStatusService, updateProductService } from "../services/productService.js"

export const createProduct = async (req, res) => {
    try {
        const hasImage = req.imageUrl || req.body.imageUrl
        const productData = {
            ...req.body,
            imageUrl: hasImage || null
        }

        const savedProduct = await createProductService(productData)
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

        // Si tiene imagen, generamos la URL firmada
        if(product.imageUrl){
            const signedUrl = await generateSignedUrl(product.imageUrl)
            product.imageUrl = signedUrl;
        }

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

        // Obtenemos el producto para saber si tiene imagen
        const currentProduct = await findProductByIdService(productId)

        const hasImage = req.imageUrl || req.body.imageUrl
        // Obtenemos producto actual para eliminar la imagen anterior si existe
        const updateData = {
            ...req.body,
            imageUrl: hasImage || currentProduct.imageUrl
        }

        // Si hay nueva imagen y hay una imagen anterior, eliminamos la anterior
        if(hasImage && currentProduct.imageUrl && currentProduct.imageUrl !== hasImage){
            await deleteImageFromS3(currentProduct.imageUrl)
        }

        const updatedProduct = await updateProductService(productId, updateData)
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

// Obtener url firmada de la imagen del producto
export const getProductImageUrl = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await findProductByIdService(productId)

        if(!product.productExist.imageUrl){
            res.status(404).json({message: "No image found for this product"})
        }
    console.log({url: product.productExist.imageUrl})
        const signedImage = await generateSignedUrl(product.productExist.imageUrl)
        
        res.status(200).json({imageUrl: signedImage})
    } catch (error) {
        res.status(500).json({message: "Internal server error", error})
    }
}