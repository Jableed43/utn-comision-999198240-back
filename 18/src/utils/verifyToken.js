// ===== VERIFICACIÓN DE TOKENS =====
// Funciones para verificar y decodificar tokens JWT

import jwt from 'jsonwebtoken'

// Función para verificar un token JWT
export const verifyToken = (token) => {
    try {
        // Decodificamos el token usando la clave secreta
        const decoded = jwt.verify(token, process.env.SECRET)
        return decoded
    } catch (error) {
        throw new Error("Token inválido")
    }
}