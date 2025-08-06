// En el clase de extends creamos una version mas especifica de una clase
// Donde una clase hija hereda todo el codigo y funcionalidades del padre
// Objetivo -> Reutilizar codigo
// Cuando extendemos hacemos un tipo de una clase base
// Hereda el codigo completo

class Vehiculo {
    acelerar() : void {
        console.log('El vehiculo acelera')
    }
}

// Cuando queres heredar de una clase a otra usamos extends
class AutoDeportivo extends Vehiculo {
    usarTurbo(): void {
        console.log("Activa el turbo")
    }
}

// Interfaces -> Contrato
// Usamos implements cuando una clase promete tener ciertos metodos y propiedades, pero no hereda codigo. 
// Objetivo es garantizar que diferentes clases tengan la misma estructura
// Cuando implementamos aseguramos que cumplimos con un contrato 
// Hereda la lista de requisitos

interface Conducible {
    conducir(): void
}

class Auto implements Conducible {
    conducir(): void {
        console.log('El auto se conduce por tierra')
    }
}

class Avion implements Conducible {
    conducir(): void {
        console.log("El avion se conduce por aire")
    }
}