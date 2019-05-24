"use strict";
function degrees(radianes) {
    return radianes * 180 / Math.PI;
}
;
function radianes(grados) {
    return grados * Math.PI / 180;
}
;
var Ruleta = /** @class */ (function () {
    function Ruleta() {
        this.canvas = document.createElement("canvas");
        this.canvas.width = 1280;
        this.canvas.height = 720;
        this.stage = new createjs.Stage(this.canvas);
        this.stage.update();
        this.ruleta = new createjs.Shape();
        this.contenedor = new createjs.Container();
        this.mascatas = new Array();
        this.contenedor.addChild(this.ruleta);
        this.stage.addChild(this.contenedor);
        this.movimiento = new createjs.Tween(this.contenedor, { loop: -1 });
        this.iniciar();
    }
    Ruleta.prototype.iniciar = function () {
        this.contenedor.x = this.canvas.width / 2;
        this.contenedor.y = this.canvas.height / 2;
        this.ruleta.graphics
            .beginFill("green")
            .drawCircle(0, 0, 300)
            .beginFill("red")
            .drawCircle(0, 0, 100)
            .beginFill("blue")
            .drawCircle(200, 0, 10);
        this.movimiento.to({ rotation: 360 }, 5000);
        this.stage.on("stagemousedown", function () {
            // this.movimiento.paused = !this.movimiento.paused;
        });
        createjs.Ticker.addEventListener("tick", this.stage);
        this.stage.update();
    };
    Ruleta.prototype.agregar = function () {
        var pet = new Mascotas(this);
        this.stage.update();
    };
    Ruleta.prototype.incluirEn = function (ubicacion) {
        var elemento = document.querySelector(ubicacion);
        elemento.append(this.canvas);
    };
    return Ruleta;
}());
