"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auto = void 0;
var partes_1 = require("./partes");
var Auto = /** @class */ (function () {
    function Auto(color, tipoRuedas, motor, frenos, tipoCombustible) {
        this.motor = motor;
        //Instanciamos dentro del constructor
        this.chasis = new partes_1.Chasis(color);
        this.frenos = frenos;
        this.ruedas = new partes_1.Ruedas(tipoRuedas);
        this.tipoCombustible = tipoCombustible;
        console.log('El auto ha sido ensamblado');
    }
    Auto.prototype.encender = function () {
        this.motor.arrancar();
    };
    Auto.prototype.apagar = function () {
        this.motor.apagar();
    };
    Auto.prototype.describirAuto = function () {
        this.chasis.describir();
        this.ruedas.describir();
    };
    Auto.prototype.conducir = function () {
        if (this.motor.estaEncendido) {
            console.log("Auto en movimiento...");
        }
        else {
            console.log("No se puede conducir, el motor está apagado");
        }
    };
    Auto.prototype.detener = function () {
        this.frenos.frenar();
    };
    return Auto;
}());
exports.Auto = Auto;
