import Product from "../models/productModel.js";

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