import { Auto } from "./Auto";
import { Frenos } from "./Frenos";
import { GanchoDeRemolque } from "./GanchoDeRemolque";
import { Motor } from "./interfaces";
import { TipoCombustible } from "./TipoCombustible";

export class Camioneta extends Auto {
    private gancho: GanchoDeRemolque;

    constructor(color: string, tipoRuedas: string, motor: Motor, frenos: Frenos, tipoCombustible?: TipoCombustible) {
        super(color, tipoRuedas, motor, frenos);
        this.gancho = new GanchoDeRemolque()
    }

    public engancharRemolque(objeto: string): void {
        this.gancho.enganchar(objeto)
    }

    public desengancharRemolque(): void{
        this.gancho.desenganchar()
    }
}