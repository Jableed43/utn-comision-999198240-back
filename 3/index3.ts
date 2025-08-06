// Interface -> Contrato, tiene tipos y propiedades pero sin implementacion
// Clase -> Propiedades y tipos, contiene la implementacion, es instanciable
// Clase abstracta -> No puede ser instanciada, los metodos pueden no tener implementacion
// Sirven como una base para otras clases

//Metodo Con implementacion -> Metodo concreto
//Metodo sin implementacion -> metodo abstracto

abstract class CuerpoCelesteAbstracto {
    public nombre: string
    protected masaKg: number
    public codigo?: number | undefined

    constructor(nombre: string, masaKg: number, codigo?: number){
        this.nombre = nombre
        this.masaKg = masaKg
        this.codigo = codigo
    }

    // Metodo abstracto -> no tiene implementacion.
    // ¿Quien tendria que implementar? Las clases hijas
    abstract describirDetalles(): string;

    //Metodo concreto -> Tiene implementacion y se hereda
    describirse(): string {
    return `El cuerpo celeste ${this.nombre} tiene una masa de ${this.masaKg} kg` 
    }
}

class PlanetaHijo extends CuerpoCelesteAbstracto {
    // radioKm se lo añadimos nosotros a esta nueva clase hija
    public radioKm: number

    constructor(nombre: string, masaKg: number, radioKm: number, codigo?: number){
        super(nombre, masaKg, codigo)
        this.radioKm = radioKm
    }

    // Implementamos el metodo abstracto requerido
    describirDetalles(): string {
        return `Soy el planeta ${this.nombre} con un radio de ${this.radioKm} km`
    }
}

const tierraHijo = new PlanetaHijo("Tierra", 200, 200, 45)
const pluton = new PlanetaHijo("pluton", 10, 10)

console.log(pluton)
console.log(tierraHijo)
console.log(tierraHijo.describirse())
console.log(tierraHijo.describirDetalles())