import { Motor } from "./interfaces";

export class MotorElectrico implements Motor{
    public estaEncendido: boolean = false;

    arrancar(): void {
        this.estaEncendido = true;
        console.log('Motor electrico encendido')
    }

    apagar(): void {
        this.estaEncendido = false;
        console.log('Motor electrico apagado')
    }
}