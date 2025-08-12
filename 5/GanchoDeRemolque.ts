import { Remolcable } from "./interfaces";

export class GanchoDeRemolque implements Remolcable{
    private objetoEnganchado: string | null = null;

    enganchar(objeto: string): void {
        this.objetoEnganchado = objeto;
        console.log(`Enganchado: ${objeto}`)
    }

    desenganchar(): void {
        //Si objeto enganchado no es null
        if(this.objetoEnganchado){
            console.log(`Desenganchado: ${this.objetoEnganchado}`)
            //Logica de limpieza que reinicia el objeto enganchado
            this.objetoEnganchado = null;
        }
    }
}