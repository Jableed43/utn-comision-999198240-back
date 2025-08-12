"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ruedas = exports.Chasis = void 0;
var Chasis = /** @class */ (function () {
    // Version simplificada de variable interna
    function Chasis(color) {
        this.color = color;
    }
    Chasis.prototype.describir = function () {
        console.log("Soy un chasis de color ".concat(this.color));
    };
    return Chasis;
}());
exports.Chasis = Chasis;
var Ruedas = /** @class */ (function () {
    function Ruedas(tipo) {
        this.tipo = tipo;
    }
    Ruedas.prototype.describir = function () {
        console.log("Ruedas de tipo: ".concat(this.tipo));
    };
    return Ruedas;
}());
exports.Ruedas = Ruedas;
