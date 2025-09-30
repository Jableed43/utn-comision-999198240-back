import Category from '../models/categoryModel.js'

export const createCategoryService = async (name) => {
    const newCategory = new Category({ name })
    const savedCategory = await newCategory.save()
    return savedCategory
}

export const getCategoriesService = async () => {
    const categories = await Category.find()

    if( categories.length === 0 ){
        const error = new Error("There are no categories")
        error.statusCode = 204;
        throw error;
    }
    return categories;
}

export const deleteCategoryService = async(id) => {
   const categoryExist = await Category.findOne({ _id: id })

    if(!categoryExist){
       const error = new Error( `Category with ${id} doesn't exist`)
        error.statusCode = 400
        throw error
    }

   const deletedCategory = await Category.deleteOne({ _id: id })
   return {categoryDeleted: categoryExist}
}