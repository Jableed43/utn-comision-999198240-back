import { Parte } from "./interfaces";

export class Chasis implements Parte{
    // Version simplificada de variable interna
    constructor(public color: string){}

    describir(): void {
        console.log(`Soy un chasis de color ${this.color}`)
    }
}

export class Ruedas implements Parte {
    constructor(public tipo: string) {}
    describir(): void {
        console.log(`Ruedas de tipo: ${this.tipo}`)
    }
}
