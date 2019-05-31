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
        this.ruleta = new createjs.Bitmap("/img/disco.png");
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
        /*  this.ruleta.graphics
              .beginFill("green")
              .drawCircle(0, 0, 300)
              .beginFill("red")
              .drawCircle(0, 0, 100)
              .beginFill("blue")
              .drawCircle(200, 0, 10);*/
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
var Mascotas = /** @class */ (function () {
    function Mascotas(ruleta) {
        this.ruleta = ruleta;
        this.stage = this.ruleta.stage;
        var width = 151;
        var height = 228;
        var data = {
            images: ["/img/nir-01.png"],
            frames: {
                width: width, height: height, regX: width / 2,
                regY: height / 2, spacing: 0, margin: 0
            },
            animations: {
                stop: {
                    frames: [0],
                    speed: 0.3
                },
                run: {
                    frames: [0, 1, 2],
                    speed: 0.3
                }
            }
        };
        var spray = new createjs.SpriteSheet(data);
        this.imagen = new createjs.Sprite(spray);
        this.imagen.gotoAndPlay("run");
        this.movimiento = new createjs.Tween(this.imagen, { loop: -1 });
        this.movimiento.to({ rotation: 360 }, 5000);
        //this.imagen.graphics.beginFill("gray").drawCircle(0, 0, 50);
        this.stage.addChild(this.imagen);
        this.iniciar();
    }
    Mascotas.prototype.iniciar = function () {
        var _this = this;
        this.imagen.on("mousedown", function () {
            console.log(_this.ruleta.mascatas.indexOf(_this) != -1);
            if (_this.ruleta.mascatas.indexOf(_this) != -1) {
                _this.ruleta.mascatas.splice(_this.ruleta.mascatas.indexOf(_this), 1);
                _this.ruleta.contenedor.removeChild(_this.imagen);
            }
            _this.stage.addChild(_this.imagen);
            _this.imagen.x = _this.stage.mouseX;
            _this.imagen.y = _this.stage.mouseY;
            var angulo = Math.floor(360 / _this.ruleta.mascatas.length);
            _this.ruleta.mascatas.forEach(function (m, i) {
                var x = Math.floor(Math.sin(radianes(angulo * (i + 1))) * 200);
                var y = Math.floor(Math.cos(radianes(angulo * (i + 1))) * 200);
                console.log(angulo * (i + 1), y, angulo);
                // m.imagen.x = x;
                // m.imagen.y = y;
                createjs.Tween.get(m.imagen).to({ x: x, y: y }, 500);
            });
        });
        this.imagen.on("pressmove", function () {
            _this.imagen.x = _this.stage.mouseX;
            _this.imagen.y = _this.stage.mouseY;
        });
        this.imagen.on("pressup", function () {
            _this.imagen.x = _this.stage.mouseX;
            _this.imagen.y = _this.stage.mouseY;
            var contenedor = _this.ruleta.contenedor;
            if (_this.ruleta.ruleta.hitTest(_this.stage.mouseX - contenedor.x, _this.stage.mouseY - contenedor.y)) {
                _this.stage.removeChild(_this.imagen);
                _this.imagen.x = 0;
                _this.imagen.y = 0;
                contenedor.addChild(_this.imagen);
                _this.ruleta.mascatas.push(_this);
                var angulo_1 = Math.floor(360 / _this.ruleta.mascatas.length);
                _this.ruleta.mascatas.forEach(function (m, i) {
                    var x = Math.floor(Math.sin(radianes(angulo_1 * (i + 1))) * 200);
                    var y = Math.floor(Math.cos(radianes(angulo_1 * (i + 1))) * 200);
                    console.log(angulo_1 * (i + 1), y, angulo_1);
                    // m.imagen.x = x;
                    // m.imagen.y = y;
                    createjs.Tween.get(m.imagen).to({ x: x, y: y }, 500);
                });
            }
            _this.stage.update();
        });
    };
    return Mascotas;
}());
var juego = new Ruleta();
juego.agregar();
juego.agregar();
juego.agregar();
juego.agregar();
juego.incluirEn("#juego");
