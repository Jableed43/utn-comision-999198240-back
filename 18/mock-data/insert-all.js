// Script para insertar todos los datos mock (categorías, usuarios y productos)
import mongoose from 'mongoose'
import Category from '../src/models/categoryModel.js'
import User from '../src/models/userModel.js'
import Product from '../src/models/productModel.js'
import { connectDB } from '../db.js'

// Conectar a la base de datos
await connectDB()

console.log('🚀 Iniciando inserción de datos mock...\n')

try {
    // 1. Insertar categorías
    console.log('📂 Insertando categorías...')
    const categoriesData = [
        { name: "electrónicos" },
        { name: "ropa" },
        { name: "hogar" },
        { name: "deportes" },
        { name: "libros" },
        { name: "juguetes" },
        { name: "automotriz" },
        { name: "belleza" },
        { name: "alimentación" },
        { name: "muebles" }
    ]
    
    await Category.deleteMany({})
    const categories = await Category.insertMany(categoriesData)
    console.log(`✅ ${categories.length} categorías insertadas`)
    
    // 2. Insertar usuarios
    console.log('\n👥 Insertando usuarios...')
    const usersData = [
        { name: "juan", lastName: "perez", email: "juan.perez@email.com", age: 25, password: "Password123" },
        { name: "maria", lastName: "garcia", email: "maria.garcia@email.com", age: 30, password: "Password123" },
        { name: "carlos", lastName: "lopez", email: "carlos.lopez@email.com", age: 28, password: "Password123" },
        { name: "ana", lastName: "martinez", email: "ana.martinez@email.com", age: 22, password: "Password123" },
        { name: "pedro", lastName: "rodriguez", email: "pedro.rodriguez@email.com", age: 35, password: "Password123" },
        { name: "laura", lastName: "fernandez", email: "laura.fernandez@email.com", age: 27, password: "Password123" },
        { name: "diego", lastName: "sanchez", email: "diego.sanchez@email.com", age: 31, password: "Password123" },
        { name: "sofia", lastName: "ramirez", email: "sofia.ramirez@email.com", age: 24, password: "Password123" },
        { name: "miguel", lastName: "torres", email: "miguel.torres@email.com", age: 29, password: "Password123" },
        { name: "isabella", lastName: "flores", email: "isabella.flores@email.com", age: 26, password: "Password123" }
    ]
    
    await User.deleteMany({})
    const users = await User.insertMany(usersData)
    console.log(`✅ ${users.length} usuarios insertados`)
    
    // 3. Insertar productos
    console.log('\n🛍️  Insertando productos...')
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
    
    await Product.deleteMany({})
    const products = await Product.insertMany(productsData)
    console.log(`✅ ${products.length} productos insertados`)
    
    // Mostrar resumen final
    console.log('\n🎉 ¡Datos mock insertados exitosamente!')
    console.log('\n📊 Resumen:')
    console.log(`   - Categorías: ${categories.length}`)
    console.log(`   - Usuarios: ${users.length}`)
    console.log(`   - Productos: ${products.length}`)
    
    console.log('\n🔐 Credenciales de prueba:')
    console.log('   Email: juan.perez@email.com | Password: Password123')
    console.log('   Email: maria.garcia@email.com | Password: Password123')
    console.log('   Email: carlos.lopez@email.com | Password: Password123')
    
    console.log('\n🚀 El sistema está listo para usar!')
    
} catch (error) {
    console.error('❌ Error al insertar datos mock:', error.message)
} finally {
    // Cerrar conexión
    await mongoose.connection.close()
    console.log('\n🔌 Conexión a MongoDB cerrada')
    process.exit(0)
}
