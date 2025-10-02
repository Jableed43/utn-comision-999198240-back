// ===== HELPERS DE USUARIO =====
// Funciones auxiliares para operaciones con usuarios

import User from "../models/userModel.js"

// Función para buscar un usuario por ID y verificar que existe
export const findUserByIdAndCheck = async (userId) => {
    try {
        const user = await User.findById(userId)
        if (!user) {
            throw new Error("Usuario no encontrado")
        }
        return user
    } catch (error) {
        throw new Error(`Error al buscar usuario: ${error.message}`)
    }
}