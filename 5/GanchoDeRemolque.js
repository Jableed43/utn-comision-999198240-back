"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GanchoDeRemolque = void 0;
var GanchoDeRemolque = /** @class */ (function () {
    function GanchoDeRemolque() {
        this.objetoEnganchado = null;
    }
    GanchoDeRemolque.prototype.enganchar = function (objeto) {
        this.objetoEnganchado = objeto;
        console.log("Enganchado: ".concat(objeto));
    };
    GanchoDeRemolque.prototype.desenganchar = function () {
        //Si objeto enganchado no es null
        if (this.objetoEnganchado) {
            console.log("Desenganchado: ".concat(this.objetoEnganchado));
            //Logica de limpieza que reinicia el objeto enganchado
            this.objetoEnganchado = null;
        }
    };
    return GanchoDeRemolque;
}());
exports.GanchoDeRemolque = GanchoDeRemolque;
