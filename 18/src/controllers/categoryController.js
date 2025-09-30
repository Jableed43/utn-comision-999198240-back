import { createCategoryService, deleteCategoryService, getCategoriesService } from "../services/categoryService.js"

// Vista de crear categoría
export const createCategoryView = (req, res) => {
    res.render("category/createCategory", { 
        title: "Crear Categoría",
        message: req.session.message || null
    })
}

// Vista de lista de categorías
export const getAllCategoriesView = async (req, res) => {
    try {
        const categories = await getCategoriesService()
        res.render("category/getAllCategories", { 
            title: "Lista de Categorías",
            categories: categories,
            message: req.session.message || null
        })
    } catch (error) {
        res.render("category/getAllCategories", { 
            title: "Lista de Categorías",
            categories: [],
            message: "No hay categorías registradas"
        })
    }
}

// Crear categoría
export const createCategory = async (req, res) => {
    try {
        const response = await createCategoryService(req.body.name)
        req.session.message = "Categoría creada exitosamente"
        res.redirect("/category/getAll")
    } catch (error) {
        req.session.message = error.message
        res.redirect("/category/create")
    }
}

// Eliminar categoría
export const deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id
        await deleteCategoryService(categoryId)
        req.session.message = "Categoría eliminada exitosamente"
        res.redirect("/category/getAll")
    } catch (error) {
        req.session.message = error.message
        res.redirect("/category/getAll")
    }
}