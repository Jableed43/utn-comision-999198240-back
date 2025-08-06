class Planeta {
    //1 Propiedades/ Atributo de clase -> Definir cuales y que tipos llevan
    nombre: string
    masaKg: number
    radioKm: number
    tieneAtmosfera: boolean


    //2 Constructor -> Inicializa las propiedades al crear el objeto - 
    // Atributos de instancia
    constructor(nombre: string, masaKg: number, radioKm: number, tieneAtmosfera: boolean){
        //El constructor recibe los argumentos a traves de los parametros y los iguala con las propiedades del objeto
        this.nombre = nombre;
        this.masaKg = masaKg;
        this.radioKm = radioKm;
        this.tieneAtmosfera = tieneAtmosfera;
    }

    //3 Metodos -> Definen el comportamiento del objeto
    // Muchas veces manejan los datos internos

    calcularVolumen(): number {
        return (4 / 3) * Math.PI * Math.pow(this.radioKm, 3);
    }


}

let saturno = new Planeta("Saturno", 200, 200, true)
console.log(`El planeta ${saturno.nombre} tiene el volumen de ${saturno.calcularVolumen()} km3.`)