"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MotorDeCombustion = void 0;
var MotorDeCombustion = /** @class */ (function () {
    function MotorDeCombustion() {
        this.estaEncendido = false;
    }
    MotorDeCombustion.prototype.arrancar = function () {
        this.estaEncendido = true;
        console.log('Motor de combustion encendido');
    };
    MotorDeCombustion.prototype.apagar = function () {
        this.estaEncendido = false;
        console.log('Motor de combustion apagado');
    };
    return MotorDeCombustion;
}());
exports.MotorDeCombustion = MotorDeCombustion;
