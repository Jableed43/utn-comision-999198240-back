import { Frenos } from "./Frenos";
import { Motor } from "./interfaces";
import { Chasis, Ruedas } from "./partes";
import { TipoCombustible } from "./TipoCombustible";

export class Auto {
    //Propiedades internas
    private motor: Motor
    private chasis: Chasis
    private frenos: Frenos
    private ruedas: Ruedas
    private tipoCombustible?: TipoCombustible

    constructor(color: string, tipoRuedas: string, motor: Motor, frenos: Frenos, tipoCombustible?: TipoCombustible){
        this.motor = motor;
        //Instanciamos dentro del constructor
        this.chasis = new Chasis(color)
        this.frenos = frenos
        this.ruedas = new Ruedas(tipoRuedas)
        this.tipoCombustible = tipoCombustible
        console.log('El auto ha sido ensamblado')
    }

    public encender(): void {
        this.motor.arrancar()
    }

    public apagar(): void {
        this.motor.apagar()
    }

    public describirAuto(): void{
        this.chasis.describir()
        this.ruedas.describir()
    }

    public conducir(): void {
        if(this.motor.estaEncendido){
            console.log("Auto en movimiento...")
        } else {
            console.log("No se puede conducir, el motor está apagado")
        }
    }

    public detener(): void{
        this.frenos.frenar()
    }
}