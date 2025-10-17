import { createProductService } from "../services/productService.js"

export const createProduct = async (req, res) => {
    try {
    const data = req.body
    const result = await createProductService(data)
    res.status(200).json(result)
    } catch (error) {
        if(error.statusCode === 409){
           return res.status(409).json({error: error.message})
        } 
        return res.status(500).json({message: "Internal server error", error: error.message})
    }

}