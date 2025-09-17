import Product, { statusEnum } from "../models/productModel.js";

export const createProductService = async (productData) => {
    // Las validaciones las maneja mongoose en el modelo
   const newProduct = new Product(productData)
   const savedProduct = await newProduct.save()
   return savedProduct 
}

export const getProductsService = async () => {
    // En los productos tenemos categoria que es un esquema aparte
    // Necesitamos populate para traer los datos de category
   const products = await Product.find().populate("category")
    if(products.length === 0){
        const error = new Error(" There are no products ")
        error.statusCode = 204
        throw error
    }
    return products
}

// Buscador por campo parcial
export const findProductByNameService = async (name) => {
    // El modelo ya maneja trim y lowercase automaticamente
    // Regex hace busqueda parcial y la options i no es sensible a mayusculas y minusculas
    const productExist = await Product.find({
        name: { $regex: name, $options: 'i' }
    })
    
    if(!productExist){
        const error = new Error( `Product ${name} doesn't exist` )
        error.statusCode = 400;
        throw error;
    }
    return { productExist }
}

export const findProductByIdService = async (productId) => {
    // El modelo ya maneja trim y lowercase automaticamente
    const productExist = await Product.findOne({_id: productId})

    if(!productExist){
        const error = new Error( `Product ${productId} doesn't exist` )
        error.statusCode = 400;
        throw error;
    }
    return { productExist }
}

export const updateProductService = async (productId, updateData) => {
    const productExist = await Product.findOne({ _id: productId })

    if(!productExist){
       const error = new Error("The product you're trying to update does not exist")
        error.statusCode = 400;
        throw error;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
        { _id: productId },
        updateData,
        { new: true }
    )

    return updatedProduct
}

export const deleteProductService = async (productId) => {
    const productExist = await Product.findOne({ _id: productId })

    if(!productExist){
       const error = new Error("The product you're trying to update does not exist")
        error.statusCode = 400;
        throw error;
    }

    const deletedProduct = await Product.findByIdAndDelete(productId)
        return { message: "product deleted succesfully", deletedProduct }
}

export const getStatusService = async () => {
    return statusEnum;
}