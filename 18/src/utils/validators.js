// ===== VALIDADORES =====
// Funciones para validar datos de entrada

// Función para validar contraseñas
export const isGoodPassword = (password) => {
    // Expresión regular para validar contraseñas
    // Debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/
    return passwordRegex.test(password)
}