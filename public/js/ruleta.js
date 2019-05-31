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
        var _this = this;
        this.canvas = document.createElement("canvas");
        //this.canvas.style.background = "red";
        this.canvas.width = 1280;
        this.canvas.height = 720;
        this.stage = new createjs.Stage(this.canvas);
        this.stage.update();
        this.ruleta = new createjs.Bitmap("/img/disco.png");
        var soporte = new createjs.Bitmap("/img/base.png");
        this.ruleta.regX = 487 / 2;
        this.ruleta.regY = 487 / 2;
        soporte.x = 330;
        soporte.y = 160;
        this.intento = 0;
        this.contenedor = new createjs.Container();
        this.mascatas = new Array();
        this.totalMascotas = new Array();
        this.marcador = new createjs.Container();
        this.palillo = new createjs.Bitmap("/img/marcador.png");
        this.punto = new createjs.Shape();
        this.marcador.x = 408;
        this.marcador.y = 166;
        this.palillo.regX = 67;
        this.palillo.regY = 97;
        this.marcador.on("pressmove", function () {
            var x = _this.ruleta.stage.mouseX;
            var y = _this.ruleta.stage.mouseY;
            var xa = _this.marcador.x;
            var ya = _this.marcador.y;
            //console.log(x, y, xa, ya)
            var angulo = ((x * xa) + (y * ya)) / (Math.sqrt((x * x) + (y * y)) * (Math.sqrt((xa * xa) + (ya * ya))));
            var inclinacion = degrees(Math.acos(angulo));
            _this.palillo.rotation = inclinacion * 2 - 60;
            // console.log(this.palillo.rotation)
        });
        this.marcador.on("pressup", function () {
            if (_this.palillo.rotation < -20) {
                if (_this.intento == 0) {
                    _this.reproducir();
                    _this.intento = 1;
                }
                else {
                    _this.totalMascotas.forEach(function (m) {
                        m.play();
                    });
                }
                _this.movimiento.paused = false;
            }
            else {
                _this.totalMascotas.forEach(function (m) {
                    m.stop();
                });
                _this.movimiento.paused = true;
            }
        });
        //createjs.Tween.get(this.marcador,{loop: -1 }).to({ rotation: 360 }, 2000);
        this.marcador.addChild(this.palillo);
        this.stage.addChild(soporte);
        this.contenedor.addChild(this.ruleta);
        this.stage.addChild(this.contenedor);
        this.stage.addChild(this.marcador);
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
        this.movimiento.paused = true;
        this.stage.on("stagemousedown", function () {
            // this.movimiento.paused = !this.movimiento.paused;
        });
        createjs.Ticker.addEventListener("tick", this.stage);
        this.stage.update();
    };
    Ruleta.prototype.agregar = function (x, y, url, sonido) {
        var pet = new Mascotas(this, url);
        this.totalMascotas.push(pet);
        pet.mover(x, y);
        pet.cargarSonido(sonido);
        this.stage.update();
    };
    Ruleta.prototype.reproducir = function () {
        var _this = this;
        this.cargar = setInterval(function () {
            var play = true;
            _this.totalMascotas.forEach(function (m) {
                if (m.sonido == null) {
                    play = false;
                }
            });
            if (play) {
                _this.totalMascotas.forEach(function (m) {
                    m.playSound();
                });
                clearInterval(_this.cargar);
                console.log("cargados");
            }
        }, 2000);
    };
    Ruleta.prototype.incluirEn = function (ubicacion) {
        var elemento = document.querySelector(ubicacion);
        elemento.append(this.canvas);
    };
    return Ruleta;
}());
var Mascotas = /** @class */ (function () {
    function Mascotas(ruleta, url) {
        this.ruleta = ruleta;
        this.stage = this.ruleta.stage;
        this.cargar = new createjs.LoadQueue();
        createjs.Sound.alternateExtensions = ["mp3"];
        this.cargar.installPlugin(createjs.Sound);
        var width = 151;
        var height = 226;
        var data = {
            images: [url],
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
        this.movimiento = new createjs.Tween(this.imagen, { loop: -1 });
        this.movimiento.to({ rotation: 360 }, 5000);
        this.movimiento.paused = true;
        //this.imagen.graphics.beginFill("gray").drawCircle(0, 0, 50);
        this.stage.addChild(this.imagen);
        this.iniciar();
    }
    Mascotas.prototype.iniciar = function () {
        var _this = this;
        this.imagen.on("mousedown", function () {
            //console.log(this.ruleta.mascatas.indexOf(this) != -1)
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
                //console.log(angulo * (i + 1), y, angulo)
                // m.imagen.x = x;
                // m.imagen.y = y;
                createjs.Tween.get(m.imagen).to({ x: x, y: y }, 500);
            });
            _this.imagen.gotoAndStop("stop");
            _this.movimiento.paused = true;
            _this.imagen.rotation = 0;
            _this.muted();
        });
        this.imagen.on("pressmove", function () {
            _this.imagen.x = _this.stage.mouseX;
            _this.imagen.y = _this.stage.mouseY;
        });
        this.imagen.on("pressup", function () {
            _this.imagen.x = _this.stage.mouseX;
            _this.imagen.y = _this.stage.mouseY;
            var contenedor = _this.ruleta.contenedor;
            var tam = contenedor.getBounds();
            if (_this.ruleta.ruleta.hitTest(_this.stage.mouseX - contenedor.x + tam.width / 2, _this.stage.mouseY - contenedor.y + tam.height / 2)) {
                _this.stage.removeChild(_this.imagen);
                _this.imagen.x = 0;
                _this.imagen.y = 0;
                contenedor.addChild(_this.imagen);
                _this.ruleta.mascatas.push(_this);
                _this.imagen.gotoAndPlay("run");
                var angulo_1 = Math.floor(360 / _this.ruleta.mascatas.length);
                _this.movimiento.paused = false;
                _this.unmuted();
                _this.ruleta.mascatas.forEach(function (m, i) {
                    var x = Math.floor(Math.sin(radianes(angulo_1 * (i + 1))) * 200);
                    var y = Math.floor(Math.cos(radianes(angulo_1 * (i + 1))) * 200);
                    //console.log(angulo * (i + 1), y, angulo)
                    // m.imagen.x = x;
                    // m.imagen.y = y;
                    createjs.Tween.get(m.imagen).to({ x: x, y: y }, 500);
                });
            }
            _this.stage.update();
        });
    };
    Mascotas.prototype.mover = function (x, y) {
        this.imagen.x = x;
        this.imagen.y = y;
    };
    Mascotas.prototype.cargarSonido = function (url) {
        var _this = this;
        this.cargar.loadFile({ id: url, src: url });
        this.cargar.on("complete", function (sound) {
            _this.sonido = createjs.Sound.createInstance(url);
            _this.sonido.muted = true;
        });
    };
    Mascotas.prototype.playSound = function () {
        if (this.sonido != null) {
            this.sonido.play();
            this.sonido.loop = 1;
        }
    };
    Mascotas.prototype.play = function () {
        if (this.sonido != null) {
            this.sonido.paused = false;
        }
    };
    Mascotas.prototype.stop = function () {
        if (this.sonido != null) {
            this.sonido.paused = true;
        }
    };
    Mascotas.prototype.muted = function () {
        if (this.sonido != null) {
            this.sonido.muted = true;
        }
    };
    Mascotas.prototype.unmuted = function () {
        if (this.sonido != null) {
            this.sonido.muted = false;
        }
    };
    return Mascotas;
}());
