"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Camioneta_1 = require("./Camioneta");
var Concesionario_1 = require("./Concesionario");
var Frenos_1 = require("./Frenos");
var MotorDeCombustion_1 = require("./MotorDeCombustion");
var TipoCombustible_1 = require("./TipoCombustible");
var concesionario = new Concesionario_1.Concesionario();
// Motor, Frenos
var motorCombustion = new MotorDeCombustion_1.MotorDeCombustion();
var frenosDeportivos = new Frenos_1.Frenos();
//La creacion del auto es dentro del concesionario
var autoDeportivo = concesionario.fabricarAuto("rojo", "deportivas", motorCombustion, frenosDeportivos, TipoCombustible_1.TipoCombustible.NAFTA);
autoDeportivo.encender();
autoDeportivo.conducir();
autoDeportivo.detener();
autoDeportivo.apagar();
console.log(concesionario.autosDisponibles);
console.log("----");
var camioneta = new Camioneta_1.Camioneta("negro", "todoterreno", new MotorDeCombustion_1.MotorDeCombustion(), new Frenos_1.Frenos(), TipoCombustible_1.TipoCombustible.DIESEL);
camioneta.encender();
camioneta.conducir();
camioneta.engancharRemolque("casa rodante");
camioneta.detener();
camioneta.desengancharRemolque();
camioneta.apagar();
