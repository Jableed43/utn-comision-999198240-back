export const isGoodPassword = value => {
    // Entre 6 y 12 caracteres, minimo un digito numerico, una letra minuscula y una letra mayuscula
    if (!value || value.length < 6 || value.length > 12) {
        return false;
    }
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
    // Retorna true si el regex es verdadero
    // Retorna false si el regex es falso
    return regex.test(value)
}