// Script para insertar datos mock de productos
import mongoose from 'mongoose'
import Product from '../src/models/productModel.js'
import Category from '../src/models/categoryModel.js'
import { connectDB } from '../db.js'

// Conectar a la base de datos
await connectDB()

try {
    // Obtener categorías existentes
    const categories = await Category.find()
    if (categories.length === 0) {
        console.log('❌ No hay categorías disponibles. Ejecuta primero el script de categorías.')
        process.exit(1)
    }
    
    console.log(`📋 Categorías disponibles: ${categories.length}`)
    
    // Datos mock de productos
    const productsData = [
        {
            name: "laptop gaming",
            price: 1500,
            profitRate: 1.30,
            description: "Laptop para gaming de alta gama con tarjeta gráfica dedicada",
            status: "AVAILABLE",
            category: categories[0]._id, // electrónicos
            stock: 15,
            highlighted: true
        },
        {
            name: "smartphone samsung",
            price: 800,
            profitRate: 1.25,
            description: "Smartphone Samsung Galaxy con cámara de 64MP",
            status: "AVAILABLE",
            category: categories[0]._id, // electrónicos
            stock: 25,
            highlighted: true
        },
        {
            name: "camiseta algodon",
            price: 25,
            profitRate: 1.50,
            description: "Camiseta de algodón 100% orgánico, talla M",
            status: "AVAILABLE",
            category: categories[1]._id, // ropa
            stock: 50,
            highlighted: false
        },
        {
            name: "tenis nike",
            price: 120,
            profitRate: 1.40,
            description: "Tenis Nike Air Max para running",
            status: "AVAILABLE",
            category: categories[3]._id, // deportes
            stock: 30,
            highlighted: true
        },
        {
            name: "mesa comedor",
            price: 300,
            profitRate: 1.35,
            description: "Mesa de comedor para 6 personas, madera de roble",
            status: "AVAILABLE",
            category: categories[9]._id, // muebles
            stock: 8,
            highlighted: false
        },
        {
            name: "libro programacion",
            price: 45,
            profitRate: 1.60,
            description: "Libro de programación en JavaScript - Edición 2024",
            status: "AVAILABLE",
            category: categories[4]._id, // libros
            stock: 20,
            highlighted: false
        },
        {
            name: "auriculares bluetooth",
            price: 80,
            profitRate: 1.45,
            description: "Auriculares inalámbricos con cancelación de ruido",
            status: "AVAILABLE",
            category: categories[0]._id, // electrónicos
            stock: 40,
            highlighted: false
        },
        {
            name: "balon futbol",
            price: 35,
            profitRate: 1.30,
            description: "Balón de fútbol oficial FIFA",
            status: "AVAILABLE",
            category: categories[3]._id, // deportes
            stock: 60,
            highlighted: false
        },
        {
            name: "crema hidratante",
            price: 15,
            profitRate: 1.80,
            description: "Crema hidratante facial con vitamina E",
            status: "AVAILABLE",
            category: categories[7]._id, // belleza
            stock: 100,
            highlighted: false
        },
        {
            name: "cafetera automatica",
            price: 200,
            profitRate: 1.25,
            description: "Cafetera automática con molinillo integrado",
            status: "AVAILABLE",
            category: categories[2]._id, // hogar
            stock: 12,
            highlighted: true
        },
        {
            name: "juego mesa",
            price: 55,
            profitRate: 1.40,
            description: "Juego de mesa para toda la familia",
            status: "AVAILABLE",
            category: categories[5]._id, // juguetes
            stock: 25,
            highlighted: false
        },
        {
            name: "aceite motor",
            price: 30,
            profitRate: 1.20,
            description: "Aceite de motor sintético 5W-30",
            status: "AVAILABLE",
            category: categories[6]._id, // automotriz
            stock: 80,
            highlighted: false
        },
        {
            name: "cereal integral",
            price: 8,
            profitRate: 1.50,
            description: "Cereal integral con fibra, paquete de 500g",
            status: "AVAILABLE",
            category: categories[8]._id, // alimentación
            stock: 200,
            highlighted: false
        },
        {
            name: "silla oficina",
            price: 180,
            profitRate: 1.35,
            description: "Silla de oficina ergonómica con soporte lumbar",
            status: "AVAILABLE",
            category: categories[9]._id, // muebles
            stock: 15,
            highlighted: false
        },
        {
            name: "tablet android",
            price: 250,
            profitRate: 1.30,
            description: "Tablet Android 10 pulgadas con 64GB de almacenamiento",
            status: "NOT AVAILABLE",
            category: categories[0]._id, // electrónicos
            stock: 0,
            highlighted: false
        }
    ]
    
    // Limpiar productos existentes
    await Product.deleteMany({})
    console.log('🗑️  Productos existentes eliminados')
    
    // Insertar nuevos productos
    const products = await Product.insertMany(productsData)
    console.log(`✅ ${products.length} productos insertados exitosamente`)
    
    // Mostrar los productos insertados
    console.log('\n🛍️  Productos insertados:')
    products.forEach(product => {
        const categoryName = categories.find(cat => cat._id.toString() === product.category.toString())?.name || 'Sin categoría'
        console.log(`   - ${product.name} | $${product.price} | ${categoryName} | Stock: ${product.stock} | ${product.status}`)
    })
    
    // Mostrar estadísticas
    console.log('\n📊 Estadísticas:')
    console.log(`   - Total productos: ${products.length}`)
    console.log(`   - Productos destacados: ${products.filter(p => p.highlighted).length}`)
    console.log(`   - Productos disponibles: ${products.filter(p => p.status === 'AVAILABLE').length}`)
    console.log(`   - Productos sin stock: ${products.filter(p => p.stock === 0).length}`)
    
} catch (error) {
    console.error('❌ Error al insertar productos:', error.message)
} finally {
    // Cerrar conexión
    await mongoose.connection.close()
    console.log('\n🔌 Conexión a MongoDB cerrada')
    process.exit(0)
}
