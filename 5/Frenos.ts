import { Frenable } from "./interfaces";

export class Frenos implements Frenable{
    frenar(): void {
        console.log(`Frenos activados`)
    }
}