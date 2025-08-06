// Interfaces -> Podemos heredar toda la interface
// UTILITY TYPES -> Programacion generica. Sirven para crear nuevos tipos.
// Pick -> Tomar solo algunas propiedades
// Omit -> Omitir algunas propiedades

interface CuerpoCelesteCompleto {
    nombre: string
    masaKg: number
    radioKm: number
    tieneAtmosfera: boolean
    esHabitable: boolean
    codigo: number
}

//Pick -> Crear un tipo basico. Tomas lo que necesitas.
type CuerpoCelesteBasico = Pick<CuerpoCelesteCompleto, 'nombre' | 'masaKg'>

const solBasico: CuerpoCelesteBasico = {
    nombre: "Sol",
    masaKg: 199999999
}

//Omit -> Excluye propiedades. Omitis lo que no necesitas.
type CuerpoCelesteSinCodigo = Omit<CuerpoCelesteCompleto, 'codigo' >

const solSinCodigo: CuerpoCelesteSinCodigo = {
    nombre: "Solcito",
    masaKg: 2000000,
    radioKm: 5000,
    esHabitable: false,
    tieneAtmosfera: false
}

// Combinar ambos

interface Autor {
    nombre: string
    email: string
    biografia: string
}

interface Libro {
    titulo: string
    contenido: string
    fechaCreacion: Date
    autorId: number
}

// Vista previa del libro
// Type -> define cualquier tipo de dato

type VistaPreviaLibro = Omit<Libro, 'contenido' | 'autorId'> & Pick< Autor, 'nombre' | 'biografia' >

const libroEjemplo: VistaPreviaLibro = {
    fechaCreacion: new Date('2025-08-05'),
    biografia: "sarasa",
    nombre: 'Autoraso',
    titulo: 'Librito'
}