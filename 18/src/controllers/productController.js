// ===== CONTROLADOR DE PRODUCTOS =====
// Este archivo maneja todas las operaciones relacionadas con productos
// Sigue el patrón MVC: recibe requests, llama a servicios, renderiza vistas

import { createProductService, deleteProductService, getProductsService, updateProductService } from "../services/productService.js"
import { getCategoriesService } from "../services/categoryService.js"

// ===== VISTAS (Lo que ve el usuario) =====

// Vista para mostrar el formulario de creación de producto
export const createProductView = async (req, res) => {
    try {
        // Obtenemos las categorías para el formulario
        const categories = await getCategoriesService()
        
        // Renderizamos la vista con el formulario de creación
        res.render("product/createProduct", { 
            title: "Crear Producto",
            categories: categories,
            message: req.session.message || null
        })
    } catch (error) {
        // Si hay error, mostramos el formulario con categorías vacías
        res.render("product/createProduct", { 
            title: "Crear Producto",
            categories: [],
            message: "Error al cargar categorías"
        })
    }
}

// Vista para mostrar la lista de todos los productos
export const getAllProductsView = async (req, res) => {
    try {
        // Llamamos al servicio para obtener todos los productos
        const products = await getProductsService()
        
        // Renderizamos la vista con la lista de productos
        res.render("product/getAllProducts", { 
            title: "Lista de Productos",
            products: products,
            message: req.session.message || null
        })
    } catch (error) {
        // Si hay error, mostramos lista vacía con mensaje de error
        res.render("product/getAllProducts", { 
            title: "Lista de Productos",
            products: [],
            message: "No hay productos registrados"
        })
    }
}

// Vista para mostrar el formulario de edición de producto
export const updateProductView = async (req, res) => {
    try {
        const productId = req.params.id
        
        // Obtenemos el producto y las categorías
        const [product, categories] = await Promise.all([
            getProductsService().then(products => products.find(p => p._id.toString() === productId)),
            getCategoriesService()
        ])
        
        if (!product) {
            req.session.message = "Producto no encontrado"
            return res.redirect("/product/getAll")
        }
        
        // Renderizamos la vista de edición
        res.render("product/updateProduct", { 
            title: "Editar Producto",
            product: product,
            categories: categories,
            message: req.session.message || null
        })
    } catch (error) {
        req.session.message = "Error al cargar producto"
        res.redirect("/product/getAll")
    }
}

// ===== ACCIONES (Lo que hace la aplicación) =====

// Función para crear un nuevo producto
export const createProduct = async (req, res) => {
    try {
        // Llamamos al servicio para crear el producto con los datos del formulario
        const response = await createProductService(req.body)
        
        // Guardamos mensaje de éxito en la sesión
        req.session.message = "Producto creado exitosamente"
        
        // Redirigimos a la lista de productos
        res.redirect("/product/getAll")
    } catch (error) {
        // Si hay error, guardamos el mensaje y redirigimos al formulario
        req.session.message = error.message
        res.redirect("/product/create")
    }
}

// Función para actualizar un producto existente
export const updateProduct = async (req, res) => {
    try {
        // Obtenemos el ID del producto desde la URL
        const productId = req.params.id
        
        // Llamamos al servicio para actualizar el producto
        const updatedProduct = await updateProductService(productId, req.body)
        
        // Mostramos mensaje de éxito y redirigimos
        req.session.message = "Producto actualizado exitosamente"
        res.redirect("/product/getAll")
    } catch (error) {
        // Si hay error, mostramos el mensaje y volvemos al formulario
        req.session.message = error.message
        res.redirect(`/product/update/${req.params.id}`)
    }
}

// Función para eliminar un producto
export const deleteProduct = async (req, res) => {
    try {
        // Obtenemos el ID del producto desde la URL
        const productId = req.params.id
        
        // Llamamos al servicio para eliminar el producto
        await deleteProductService(productId)
        
        // Mostramos mensaje de éxito y redirigimos
        req.session.message = "Producto eliminado exitosamente"
        res.redirect("/product/getAll")
    } catch (error) {
        // Si hay error, mostramos el mensaje y volvemos a la lista
        req.session.message = error.message
        res.redirect("/product/getAll")
    }
}