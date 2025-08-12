"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Concesionario = void 0;
var Auto_1 = require("./Auto");
var Concesionario = /** @class */ (function () {
    function Concesionario() {
        this.autosDisponibles = [];
    }
    Concesionario.prototype.fabricarAuto = function (color, tipoRuedas, tipoMotor, tipoFrenos, tipoCombustible) {
        var nuevoAuto = new Auto_1.Auto(color, tipoRuedas, tipoMotor, tipoFrenos, tipoCombustible);
        this.autosDisponibles.push(nuevoAuto);
        return nuevoAuto;
    };
    return Concesionario;
}());
exports.Concesionario = Concesionario;
