// ===== DATOS DE PRUEBA PARA CATEGORÍAS =====
// Script para insertar categorías de ejemplo en la base de datos

import { connectDB } from '../db.js'
import Category from '../src/models/categoryModel.js'

const categoriesData = [
    { name: "Electrónicos" },
    { name: "Ropa" },
    { name: "Hogar" },
    { name: "Deportes" },
    { name: "Libros" }
]

const insertCategories = async () => {
    try {
        // Conectar a la base de datos
        await connectDB()
        
        // Limpiar categorías existentes
        await Category.deleteMany({})
        
        // Insertar nuevas categorías
        const categories = await Category.insertMany(categoriesData)
        
        console.log(`✅ ${categories.length} categorías insertadas exitosamente`)
        console.log("Categorías creadas:")
        categories.forEach(category => {
            console.log(`  - ${category.name}`)
        })
        
        process.exit(0)
    } catch (error) {
        console.error("❌ Error al insertar categorías:", error.message)
        process.exit(1)
    }
}

insertCategories()
