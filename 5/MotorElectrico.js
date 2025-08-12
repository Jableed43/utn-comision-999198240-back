"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MotorElectrico = void 0;
var MotorElectrico = /** @class */ (function () {
    function MotorElectrico() {
        this.estaEncendido = false;
    }
    MotorElectrico.prototype.arrancar = function () {
        this.estaEncendido = true;
        console.log('Motor electrico encendido');
    };
    MotorElectrico.prototype.apagar = function () {
        this.estaEncendido = false;
        console.log('Motor electrico apagado');
    };
    return MotorElectrico;
}());
exports.MotorElectrico = MotorElectrico;
