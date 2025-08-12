import { Auto } from "./Auto";
import { Frenos } from "./Frenos";
import { Motor } from "./interfaces";
import { TipoCombustible } from "./TipoCombustible";

export class Concesionario {
    public autosDisponibles: Auto[] = []

    fabricarAuto(color: string, tipoRuedas: string, tipoMotor: Motor, tipoFrenos: Frenos, tipoCombustible?: TipoCombustible): Auto {
        const nuevoAuto = new Auto(color, tipoRuedas, tipoMotor, tipoFrenos, tipoCombustible)
        this.autosDisponibles.push(nuevoAuto)
        return nuevoAuto;
    }
}