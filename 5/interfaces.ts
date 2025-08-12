// Actividad integradora
// Auto -> motor, frenos, remolcar, partes, 
// Motor -> tipos de motor
// Partes -> chasis, ruedas
// Remolcable -> gancho de remolque

// Interfaces -> contratos, no tienen implementacion, no generan instancias
interface Motor {
    arrancar(): void;
    apagar(): void;
    estaEncendido: boolean
}

interface Frenable {
    frenar(): void
}

interface Remolcable {
    enganchar(objeto: string): void
    desenganchar(): void
}

interface Parte {
    describir(): void
}

export {Motor, Frenable, Remolcable, Parte}