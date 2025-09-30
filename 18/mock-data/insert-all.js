// ===== SCRIPT MAESTRO PARA INSERTAR TODOS LOS DATOS DE PRUEBA =====
// Ejecuta todos los scripts de mock data en orden

import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

const insertAllData = async () => {
    try {
        console.log("🚀 Iniciando inserción de datos de prueba...")
        
        // 1. Insertar categorías
        console.log("\n📂 Insertando categorías...")
        await execAsync('node mock-data/categories.js')
        
        // 2. Insertar usuarios
        console.log("\n👥 Insertando usuarios...")
        await execAsync('node mock-data/users.js')
        
        // 3. Insertar productos
        console.log("\n📦 Insertando productos...")
        await execAsync('node mock-data/products.js')
        
        console.log("\n✅ ¡Todos los datos de prueba han sido insertados exitosamente!")
        console.log("\n📋 Resumen:")
        console.log("  - 5 categorías")
        console.log("  - 5 usuarios")
        console.log("  - 8 productos")
        console.log("\n🎉 El sistema está listo para usar!")
        
    } catch (error) {
        console.error("❌ Error al insertar datos:", error.message)
        process.exit(1)
    }
}

insertAllData()
