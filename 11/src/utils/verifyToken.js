import jwt from "jsonwebtoken"

// Funcion que verifica y valida que el token sea correcto y funcional sin estar vencido
export function verifyToken(token){
    try {
        const decoded = jwt.verify(token, "secret")
        return decoded
    } catch (error) {
        throw new Error("Token invalido")
    }
}