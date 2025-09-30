// Script para insertar datos mock de categorías
import mongoose from 'mongoose'
import Category from '../src/models/categoryModel.js'
import { connectDB } from '../db.js'

// Conectar a la base de datos
await connectDB()

// Datos mock de categorías
const categoriesData = [
    {
        name: "electrónicos"
    },
    {
        name: "ropa"
    },
    {
        name: "hogar"
    },
    {
        name: "deportes"
    },
    {
        name: "libros"
    },
    {
        name: "juguetes"
    },
    {
        name: "automotriz"
    },
    {
        name: "belleza"
    },
    {
        name: "alimentación"
    },
    {
        name: "muebles"
    }
]

try {
    // Limpiar categorías existentes
    await Category.deleteMany({})
    console.log('🗑️  Categorías existentes eliminadas')
    
    // Insertar nuevas categorías
    const categories = await Category.insertMany(categoriesData)
    console.log(`✅ ${categories.length} categorías insertadas exitosamente`)
    
    // Mostrar las categorías insertadas
    console.log('\n📋 Categorías insertadas:')
    categories.forEach(category => {
        console.log(`   - ${category.name} (ID: ${category._id})`)
    })
    
} catch (error) {
    console.error('❌ Error al insertar categorías:', error.message)
} finally {
    // Cerrar conexión
    await mongoose.connection.close()
    console.log('\n🔌 Conexión a MongoDB cerrada')
    process.exit(0)
}
