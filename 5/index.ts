import { Camioneta } from "./Camioneta";
import { Concesionario } from "./Concesionario";
import { Frenos } from "./Frenos";
import { MotorDeCombustion } from "./MotorDeCombustion";
import { TipoCombustible } from "./TipoCombustible";

const concesionario = new Concesionario();

// Motor, Frenos
const motorCombustion = new MotorDeCombustion();
const frenosDeportivos = new Frenos();
//La creacion del auto es dentro del concesionario
const autoDeportivo = concesionario.fabricarAuto("rojo", "deportivas", motorCombustion, frenosDeportivos, TipoCombustible.NAFTA)

autoDeportivo.encender()
autoDeportivo.conducir()
autoDeportivo.detener()
autoDeportivo.apagar()
console.log(concesionario.autosDisponibles)

console.log("----")
const camioneta = new Camioneta("negro", "todoTerreno", new MotorDeCombustion(), new Frenos(), TipoCombustible.DIESEL)

camioneta.encender()
camioneta.conducir()
camioneta.engancharRemolque("casa rodante")
camioneta.detener()
camioneta.desengancharRemolque()
camioneta.apagar()