import Product from '../models/productModel.js'

export const createProductService = async (data) => {
    const productName = data.name 
    const exist = await Product.findOne({ name: productName })
    if(exist){
        const error = new Error(`A product with the same name ${productName} already exist and it has to be unique`)
        error.statusCode = 409
        throw error
    }
    const newProduct = new Product(data)
    const productSaved = await newProduct.save()
    return { productSaved }
}