// Script para insertar datos mock de usuarios
import mongoose from 'mongoose'
import User from '../src/models/userModel.js'
import { connectDB } from '../db.js'
import bcrypt from 'bcrypt'

// Conectar a la base de datos
await connectDB()

// Datos mock de usuarios
const usersData = [
    {
        name: "juan",
        lastName: "perez",
        email: "juan.perez@email.com",
        age: 25,
        password: "Password123"
    },
    {
        name: "maria",
        lastName: "garcia",
        email: "maria.garcia@email.com",
        age: 30,
        password: "Password123"
    },
    {
        name: "carlos",
        lastName: "lopez",
        email: "carlos.lopez@email.com",
        age: 28,
        password: "Password123"
    },
    {
        name: "ana",
        lastName: "martinez",
        email: "ana.martinez@email.com",
        age: 22,
        password: "Password123"
    },
    {
        name: "pedro",
        lastName: "rodriguez",
        email: "pedro.rodriguez@email.com",
        age: 35,
        password: "Password123"
    },
    {
        name: "laura",
        lastName: "fernandez",
        email: "laura.fernandez@email.com",
        age: 27,
        password: "Password123"
    },
    {
        name: "diego",
        lastName: "sanchez",
        email: "diego.sanchez@email.com",
        age: 31,
        password: "Password123"
    },
    {
        name: "sofia",
        lastName: "ramirez",
        email: "sofia.ramirez@email.com",
        age: 24,
        password: "Password123"
    },
    {
        name: "miguel",
        lastName: "torres",
        email: "miguel.torres@email.com",
        age: 29,
        password: "Password123"
    },
    {
        name: "isabella",
        lastName: "flores",
        email: "isabella.flores@email.com",
        age: 26,
        password: "Password123"
    }
]

try {
    // Limpiar usuarios existentes
    await User.deleteMany({})
    console.log('🗑️  Usuarios existentes eliminados')
    
    // Insertar nuevos usuarios
    const users = await User.insertMany(usersData)
    console.log(`✅ ${users.length} usuarios insertados exitosamente`)
    
    // Mostrar los usuarios insertados
    console.log('\n👥 Usuarios insertados:')
    users.forEach(user => {
        console.log(`   - ${user.name} ${user.lastName} (${user.email}) - Edad: ${user.age}`)
    })
    
    console.log('\n🔐 Credenciales de prueba:')
    console.log('   Email: juan.perez@email.com | Password: Password123')
    console.log('   Email: maria.garcia@email.com | Password: Password123')
    console.log('   Email: carlos.lopez@email.com | Password: Password123')
    
} catch (error) {
    console.error('❌ Error al insertar usuarios:', error.message)
} finally {
    // Cerrar conexión
    await mongoose.connection.close()
    console.log('\n🔌 Conexión a MongoDB cerrada')
    process.exit(0)
}
