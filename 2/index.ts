// 1. Declaracion de variables y tipos basicos
let galaxiasObservadas: number | undefined = 100
galaxiasObservadas = undefined

let nebulosaFavorita: string = 'Nebulosa de Orión'

let hayVidaExoPlaneta: boolean = true 

// Any se asigna a cualquier tipo
let misterioCosmico: any = "Un objeto no identificado"
misterioCosmico = 99
misterioCosmico = true

// 2. Colecciones y estructuras de datos
//Definir un array
let planetasRocosos: string[] = ["Tierra", "Marte", "Venus"]

//programacion generica
let edadesEstrellas: Array<number> = [500, 1000, 250]

// 3. Tuplas -> Es un array con nun numero fijo de elementos
// Cada elemento tiene una posicion espefica
// Hay un orden, tipo y cantidad de datos que siempre se respeta
// La tupla puede contener distintos tipos de datos en comparacion del array
let coordenadasAgujeroNegro: [number, number] = [20.5, -15.8]

let coordenadasAgujeroNegro2: [string, number] = ["a", -15.8]

// Enum -> Definis un conjunto de nombres constantes
// Categorias definidas, roles 
// Enum numerico
enum TipoCuerpoCeleste {
    Planeta,
    Estrella,
    Galaxia,
    Nebulosa,
    AgujeroNegro
}

//Reverse mapping, solo sirve con enum numerico
// console.log(TipoCuerpoCeleste[miCuerpoFavorito])

//Enum string
// enum TipoCuerpoCeleste {
//     Planeta = "PLANETA",
//     Estrella = "ESTRELLA",
//     Galaxia = "GALAXIA",
//     Nebulosa = "NEBULOSA",
//     AgujeroNegro = "AGUJERONEGRO"
// }

let miCuerpoFavorito: TipoCuerpoCeleste = TipoCuerpoCeleste.Galaxia
// if(miCuerpoFavorito ===  TipoCuerpoCeleste.Galaxia) {
//     console.log("coinciden")
// } else {
//     console.log('No coinciden')
// }

//3. interfaces -> Es un contrato, que los objetos deben cumplir
interface CuerpoCeleste {
    nombre: string;
    tipo: TipoCuerpoCeleste; // OOP -> pilar de Abstraccion
    masaKg: number;
    tieneAtmosfera?: boolean; // "?" indica que esta propiedad es opcional
    saludar?(): void;
}

const tierra: CuerpoCeleste = {
    nombre: "Tierra",
    tipo: TipoCuerpoCeleste.Planeta,
    masaKg: 5.972e24,
    tieneAtmosfera: true,
    saludar: function() { console.log(`Hola soy ${this.nombre} `) }
}

const sol: CuerpoCeleste = {
    nombre: "Sol",
    tipo: TipoCuerpoCeleste.Estrella,
    masaKg: 1.989e30,
    saludar: () => console.log('Hola soy el sol')
}

//Como heredamos de otra interface?

interface Sol extends CuerpoCeleste {
    temperatura: number
}

const nuestroSol: Sol = {
    nombre: "Sol",
    tipo: TipoCuerpoCeleste.Estrella,
    masaKg: 1.989e30,
    temperatura: 5000
}

const nuestroSistemaSolar: CuerpoCeleste[] = [tierra, sol, nuestroSol]


// Funciones

function calcularDensidad(masa: number, volumen: number): number {
    if(volumen === 0){
        console.error("El volumen no puede ser cero")
        return 0
    } 
    return masa / volumen
}

let densidadTierra = calcularDensidad(tierra.masaKg, 1.083e12)
console.log({densidadTierra})

// Utilizar interfaz como parametro

function describirCuerpoCeleste(cuerpo: CuerpoCeleste): string {
    let descripcion = `El ${TipoCuerpoCeleste[cuerpo.tipo]} ${cuerpo.nombre} tiene una masa de ${cuerpo.masaKg} KG `
    if(cuerpo.tieneAtmosfera !== undefined){
        descripcion += `Tiene atmosfera `
    }
    return descripcion
}

console.log(describirCuerpoCeleste(tierra))
console.log(describirCuerpoCeleste(sol))