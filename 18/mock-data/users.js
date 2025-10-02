// ===== DATOS DE PRUEBA PARA USUARIOS =====
// Script para insertar usuarios de ejemplo en la base de datos

import { connectDB } from '../db.js'
import User from '../src/models/userModel.js'
import bcrypt from 'bcrypt'

const usersData = [
    {
        name: "Juan",
        lastName: "Pérez",
        email: "juan.perez@email.com",
        age: 25,
        password: "Password123"
    },
    {
        name: "María",
        lastName: "García",
        email: "maria.garcia@email.com",
        age: 30,
        password: "Password123"
    },
    {
        name: "Carlos",
        lastName: "López",
        email: "carlos.lopez@email.com",
        age: 28,
        password: "Password123"
    },
    {
        name: "Ana",
        lastName: "Martínez",
        email: "ana.martinez@email.com",
        age: 35,
        password: "Password123"
    },
    {
        name: "Luis",
        lastName: "Rodríguez",
        email: "luis.rodriguez@email.com",
        age: 22,
        password: "Password123"
    }
]

const insertUsers = async () => {
    try {
        // Conectar a la base de datos
        await connectDB()
        
        // Limpiar usuarios existentes
        await User.deleteMany({})
        
        // Los usuarios se crean con contraseñas en texto plano
        // El modelo se encarga de encriptarlas automáticamente
        const users = usersData
        
        // Insertar usuarios
        const createdUsers = await User.insertMany(users)
        
        console.log(`✅ ${createdUsers.length} usuarios insertados exitosamente`)
        console.log("Usuarios creados:")
        createdUsers.forEach(user => {
            console.log(`  - ${user.name} ${user.lastName} (${user.email})`)
        })
        
        process.exit(0)
    } catch (error) {
        console.error("❌ Error al insertar usuarios:", error.message)
        process.exit(1)
    }
}

insertUsers()
