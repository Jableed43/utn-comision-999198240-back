// ===== DATOS DE PRUEBA PARA PRODUCTOS =====
// Script para insertar productos de ejemplo en la base de datos

import { connectDB } from '../db.js'
import Product from '../src/models/productModel.js'
import Category from '../src/models/categoryModel.js'

const insertProducts = async () => {
    try {
        // Conectar a la base de datos
        await connectDB()
        
        // Obtener categorías existentes
        const categories = await Category.find({})
        
        if (categories.length === 0) {
            console.log("❌ No hay categorías disponibles. Ejecuta primero: npm run mock:categories")
            process.exit(1)
        }
        
        // Limpiar productos existentes
        await Product.deleteMany({})
        
        // Datos de productos
        const productsData = [
            {
                name: "Laptop HP",
                price: 899.99,
                category: categories[0]._id, // Electrónicos
                status: "AVAILABLE"
            },
            {
                name: "Camiseta Nike",
                price: 29.99,
                category: categories[1]._id, // Ropa
                status: "AVAILABLE"
            },
            {
                name: "Sofá 3 plazas",
                price: 599.99,
                category: categories[2]._id, // Hogar
                status: "AVAILABLE"
            },
            {
                name: "Balón de Fútbol",
                price: 19.99,
                category: categories[3]._id, // Deportes
                status: "AVAILABLE"
            },
            {
                name: "Libro de Programación",
                price: 49.99,
                category: categories[4]._id, // Libros
                status: "AVAILABLE"
            },
            {
                name: "Smartphone Samsung",
                price: 699.99,
                category: categories[0]._id, // Electrónicos
                status: "NOT AVAILABLE"
            },
            {
                name: "Mesa de Comedor",
                price: 299.99,
                category: categories[2]._id, // Hogar
                status: "AVAILABLE"
            },
            {
                name: "Zapatillas Adidas",
                price: 89.99,
                category: categories[1]._id, // Ropa
                status: "DISCONTINUED"
            }
        ]
        
        // Insertar productos
        const products = await Product.insertMany(productsData)
        
        console.log(`✅ ${products.length} productos insertados exitosamente`)
        console.log("Productos creados:")
        products.forEach(product => {
            const categoryName = categories.find(cat => cat._id.toString() === product.category.toString())?.name || "Sin categoría"
            console.log(`  - ${product.name} - $${product.price} (${categoryName})`)
        })
        
        process.exit(0)
    } catch (error) {
        console.error("❌ Error al insertar productos:", error.message)
        process.exit(1)
    }
}

insertProducts()
