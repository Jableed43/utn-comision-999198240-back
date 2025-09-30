export const isGoodPassword = value => {
    // Entre 6 y 12 caracteres, minimo un digito numerico, una letra minuscula y una letra mayuscula
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}/;
    // Retorna true si el regex es verdadero
    // Retorna false si el regex es falso
    return regex.test(value)
}