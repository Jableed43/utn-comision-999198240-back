import { createProductService, deleteProductService, getProductsService, updateProductService } from "../services/productService.js"
import { getCategoriesService } from "../services/categoryService.js"

// Vista de crear producto
export const createProductView = async (req, res) => {
    try {
        const categories = await getCategoriesService()
        res.render("product/createProduct", { 
            title: "Crear Producto",
            categories: categories,
            message: req.session.message || null
        })
    } catch (error) {
        res.render("product/createProduct", { 
            title: "Crear Producto",
            categories: [],
            message: "Error al cargar categorías"
        })
    }
}

// Vista de lista de productos
export const getAllProductsView = async (req, res) => {
    try {
        const products = await getProductsService()
        res.render("product/getAllProducts", { 
            title: "Lista de Productos",
            products: products,
            message: req.session.message || null
        })
    } catch (error) {
        res.render("product/getAllProducts", { 
            title: "Lista de Productos",
            products: [],
            message: "No hay productos registrados"
        })
    }
}

// Vista de editar producto
export const updateProductView = async (req, res) => {
    try {
        const productId = req.params.id
        const [products, categories] = await Promise.all([
            getProductsService(),
            getCategoriesService()
        ])
        const product = products.find(p => p._id.toString() === productId)
        
        if (!product) {
            req.session.message = "Producto no encontrado"
            return res.redirect("/product/getAll")
        }
        
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

// Crear producto
export const createProduct = async (req, res) => {
    try {
        const response = await createProductService(req.body)
        req.session.message = "Producto creado exitosamente"
        res.redirect("/product/getAll")
    } catch (error) {
        req.session.message = error.message
        res.redirect("/product/create")
    }
}

// Actualizar producto
export const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id
        const updatedProduct = await updateProductService(productId, req.body)
        req.session.message = "Producto actualizado exitosamente"
        res.redirect("/product/getAll")
    } catch (error) {
        req.session.message = error.message
        res.redirect(`/product/update/${req.params.id}`)
    }
}

// Eliminar producto
export const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id
        await deleteProductService(productId)
        req.session.message = "Producto eliminado exitosamente"
        res.redirect("/product/getAll")
    } catch (error) {
        req.session.message = error.message
        res.redirect("/product/getAll")
    }
}