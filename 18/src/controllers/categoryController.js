// ===== CONTROLADOR DE CATEGORÍAS =====
// Este archivo maneja todas las operaciones relacionadas con categorías
// Sigue el patrón MVC: recibe requests, llama a servicios, renderiza vistas

import { createCategoryService, deleteCategoryService, getCategoriesService } from "../services/categoryService.js"

// ===== VISTAS (Lo que ve el usuario) =====

// Vista para mostrar el formulario de creación de categoría
export const createCategoryView = (req, res) => {
    // Renderizamos la vista con el formulario de creación
    res.render("category/createCategory", { 
        title: "Crear Categoría",
        message: req.session.message || null
    })
}

// Vista para mostrar la lista de todas las categorías
export const getAllCategoriesView = async (req, res) => {
    try {
        // Llamamos al servicio para obtener todas las categorías
        const categories = await getCategoriesService()
        
        // Renderizamos la vista con la lista de categorías
        res.render("category/getAllCategories", { 
            title: "Lista de Categorías",
            categories: categories,
            message: req.session.message || null
        })
    } catch (error) {
        // Si hay error, mostramos lista vacía con mensaje de error
        res.render("category/getAllCategories", { 
            title: "Lista de Categorías",
            categories: [],
            message: "No hay categorías registradas"
        })
    }
}

// ===== ACCIONES (Lo que hace la aplicación) =====

// Función para crear una nueva categoría
export const createCategory = async (req, res) => {
    try {
        // Llamamos al servicio para crear la categoría con los datos del formulario
        const response = await createCategoryService(req.body.name)
        
        // Guardamos mensaje de éxito en la sesión
        req.session.message = "Categoría creada exitosamente"
        
        // Redirigimos a la lista de categorías
        res.redirect("/category/getAll")
    } catch (error) {
        // Si hay error, guardamos el mensaje y redirigimos al formulario
        req.session.message = error.message
        res.redirect("/category/create")
    }
}

// Función para eliminar una categoría
export const deleteCategory = async (req, res) => {
    try {
        // Obtenemos el ID de la categoría desde la URL
        const categoryId = req.params.id
        
        // Llamamos al servicio para eliminar la categoría
        await deleteCategoryService(categoryId)
        
        // Mostramos mensaje de éxito y redirigimos
        req.session.message = "Categoría eliminada exitosamente"
        res.redirect("/category/getAll")
    } catch (error) {
        // Si hay error, mostramos el mensaje y volvemos a la lista
        req.session.message = error.message
        res.redirect("/category/getAll")
    }
}