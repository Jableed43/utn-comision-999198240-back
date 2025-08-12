"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Camioneta = void 0;
var Auto_1 = require("./Auto");
var GanchoDeRemolque_1 = require("./GanchoDeRemolque");
var Camioneta = /** @class */ (function (_super) {
    __extends(Camioneta, _super);
    function Camioneta(color, tipoRuedas, motor, frenos, tipoCombustible) {
        var _this = _super.call(this, color, tipoRuedas, motor, frenos) || this;
        _this.gancho = new GanchoDeRemolque_1.GanchoDeRemolque();
        return _this;
    }
    Camioneta.prototype.engancharRemolque = function (objeto) {
        this.gancho.enganchar(objeto);
    };
    Camioneta.prototype.desengancharRemolque = function () {
        this.gancho.desenganchar();
    };
    return Camioneta;
}(Auto_1.Auto));
exports.Camioneta = Camioneta;
