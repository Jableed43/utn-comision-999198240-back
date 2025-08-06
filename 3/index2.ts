//OOP object oriented programming, 
// Pilares:
// Abstraccion -> Ocultar la compejidad
// Encapsulacion -> Protejer los datos de un objeto de accesos no autorizados

// Como lo resolvemos? -> Modificadores de acceso (Propiedades y metodos)
// Public (x defecto) -> Es accesible desde cualquier lugar
// Private -> Solo se accede dentro de la clase. Oculta detalles de implementacion
// Protected -> Accede dentro de la clase y en clases que la hereden
// readonly -> Puede ser asignada en la declaracion o en el constructor, garantiza inmutabilidad

class PlanetaConAcceso {
    public readonly nombre: string
    private _masaKg: number
    protected radioKm: number

    constructor(nombre: string, _masaKg: number, radioKm: number){
        this.nombre = nombre
        this._masaKg = _masaKg
        this.radioKm = radioKm
    }

    //set -> asignas un valor
    //get -> traes o lees un valor

    //Metodo publico para exponer de forma controlada una propiedad privada
    public getMasa(): number {
        console.log(`Desde un metodo publico -> accedemos a la masa privada de ${this.nombre}`)
        return this._masaKg
    }

    //Metodo publico para mostrar una propiedad protegida
    public getRadio(): void {
        console.log(`Desde un metodo publico -> El radio de ${this.nombre} es ${this.radioKm}`)
    }

    private metodoInterno(): void {
        console.log(`Desde un metodo privado -> Soy un metodo interno de ${this.nombre}`)
    }

}

const marte = new PlanetaConAcceso("Marte", 6000, 3300)

//Public solo de lectura
console.log(marte.nombre)
// Solo accesible por metodo
console.log(marte.getMasa())
// Solo accesible por metodo
marte.getRadio()
 
// Ejemplo de acceso protegido -> Desde una clase hija
// Herencia de clase hija
class PlanetaConSatelites extends PlanetaConAcceso {
    satelites: string[]

    constructor(nombre: string, _masaKg: number, radioKm: number, satelites: string[]){
        super(nombre, _masaKg, radioKm);
        this.satelites = satelites;
        console.log(`Desde la clase hija -> el radio del planeta es ${this.radioKm}`)
        // console.log(`Desde la clase hija -> la masa del planeta es ${this._masaKg}`)
    }
}

const jupiter = new PlanetaConSatelites("Jupiter", 1000000, 69111, ["io", "europa", "ganimedes"])

console.log({jupiter})