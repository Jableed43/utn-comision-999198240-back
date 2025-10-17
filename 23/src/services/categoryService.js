import Category from '../models/categoryModel.js'

export const createCategoryService = async (data) => {
        const exist = await Category.findOne({ name: data.name })
        if(exist){
            const error = new Error(`Category ${data.name} already exists, choose another name`)
            error.statusCode = 409  // Cambiar de 404 a 409
            throw error
        }
        const newCategory = new Category(data)
        const savedCategory = await newCategory.save()
        return savedCategory
}

export const deleteCategoryService = async (categoryId) => {
    const exist = await Category.findById({ _id: categoryId })
    if(!exist){
        const error = new Error(`Category with ${categoryId} doesn't exist`)
        error.statusCode = 400
        throw error
    }
    const result = await Category.deleteOne({ _id: categoryId})
    return { result }
} 

export const updateCategoryService = async (categoryId, data) => {
    const exist = await Category.findById({ _id: categoryId })
    if(!exist){
        const error = new Error(`Category with ${categoryId} doesn't exist`)
        error.statusCode = 400
        throw error
    }
    const result = await Category.findByIdAndUpdate({ _id: categoryId}, data, {new: true})
    return { result }
} 

export const getCategoriesService = async () => {
    const categories = await Category.find()

    if(categories.length === 0){
       const error = new Error("There are not categories")
       error.statusCode = 204
       throw error
    }
    
    return { categories }
}