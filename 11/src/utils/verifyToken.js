// Este util sirve para verificar los tokens
import jwt from 'jsonwebtoken'
import { SECRET } from '../../config.js'

// Creamos una funcion que verifica y valida que el token sea correcto y funcional sin estar vencido
export function verifyToken(token) {
    try {
        // Decodificamos
       const decoded = jwt.verify(token, SECRET)
       return decoded
    } catch (error) {
        throw new Error("Invalid Token")
    }
}