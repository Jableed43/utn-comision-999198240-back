import { Motor } from './interfaces';


export class MotorDeCombustion implements Motor{
    
    public estaEncendido: boolean = false;

    arrancar(): void {
        this.estaEncendido = true;
        console.log('Motor de combustion encendido')
    }

    apagar(): void {
        this.estaEncendido = false;
        console.log('Motor de combustion apagado')
    }
}