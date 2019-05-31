function degrees(radianes: number) {
    return radianes * 180 / Math.PI;
};

function radianes(grados: number) {
    return grados * Math.PI / 180;
};

class Ruleta {

    stage: createjs.Stage;
    canvas: HTMLCanvasElement;
    contenedor: createjs.Container;
    ruleta: createjs.Bitmap;
    movimiento: createjs.Tween;
    mascatas: Array<Mascotas>;
    cargar: any;
    totalMascotas: Array<Mascotas>;
    marcador: createjs.Container;
    palillo: createjs.Bitmap;
    punto: createjs.Shape;

    intento: number;

    constructor() {
        this.canvas = document.createElement("canvas");
        this.canvas.style.background = "red";
        this.canvas.width = 1280;
        this.canvas.height = 720;
        this.stage = new createjs.Stage(this.canvas);
        this.stage.update();

        this.ruleta = new createjs.Bitmap("/img/disco.png");
        let soporte = new createjs.Bitmap("/img/base.png");
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

        this.marcador.on("pressmove", () => {
            let x = this.ruleta.stage.mouseX;
            let y = this.ruleta.stage.mouseY;

            let xa = this.marcador.x;
            let ya = this.marcador.y;

            //console.log(x, y, xa, ya)

            let angulo = ((x * xa) + (y * ya)) / (Math.sqrt((x * x) + (y * y)) * (Math.sqrt((xa * xa) + (ya * ya))));
            let inclinacion = degrees(Math.acos(angulo));
            this.palillo.rotation = inclinacion * 2 - 60;
           // console.log(this.palillo.rotation)

        });

        this.marcador.on("pressup", () => {

            if (this.palillo.rotation < -20) {
                if (this.intento == 0) {
                    this.reproducir();
                    this.intento = 1;
                } else {
                    this.totalMascotas.forEach((m) => {
                        m.play()
                    });
                }

                this.movimiento.paused = false;
            }
            else {
                this.totalMascotas.forEach((m) => {
                    m.stop()
                });
                this.movimiento.paused = true;
            }
        });

        //createjs.Tween.get(this.marcador,{loop: -1 }).to({ rotation: 360 }, 2000);

        this.marcador.addChild(this.palillo);

        this.stage.addChild(soporte)
        this.contenedor.addChild(this.ruleta);
        this.stage.addChild(this.contenedor);
        this.stage.addChild(this.marcador);

        this.movimiento = new createjs.Tween(this.contenedor, { loop: -1 });

        this.iniciar();

    }

    iniciar() {
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

        this.stage.on("stagemousedown", () => {
            // this.movimiento.paused = !this.movimiento.paused;
        });

        createjs.Ticker.addEventListener("tick", this.stage);
        this.stage.update();
    }

    agregar(x: number, y: number, url: string, sonido: string) {
        let pet = new Mascotas(this, url);
        this.totalMascotas.push(pet);
        pet.mover(x, y);
        pet.cargarSonido(sonido);
        this.stage.update();
    }

    reproducir() {

        this.cargar = setInterval(() => {
            let play = true;
            this.totalMascotas.forEach((m) => {

                if (m.sonido == null) {
                    play = false;
                }
            });

            if (play) {
                this.totalMascotas.forEach((m) => {
                    m.playSound();
                });
                clearInterval(this.cargar);
                console.log("cargados");
            }


        }, 2000);

    }



    incluirEn(ubicacion: string) {
        let elemento: HTMLElement = <HTMLElement>document.querySelector(ubicacion);
        elemento.append(this.canvas);

    }
}

class Mascotas {

    ruleta: Ruleta;
    stage: createjs.Stage;
    imagen: createjs.Sprite;
    movimiento: createjs.Tween;
    cargar: createjs.LoadQueue;
    sonido?: createjs.AbstractSoundInstance;

    constructor(ruleta: Ruleta, url: string) {
        this.ruleta = ruleta;
        this.stage = this.ruleta.stage;

        this.cargar = new createjs.LoadQueue();
        createjs.Sound.alternateExtensions = ["mp3"];
        this.cargar.installPlugin(createjs.Sound);

        let width = 151;
        let height = 226;
        let data = {
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



        let spray = new createjs.SpriteSheet(data);

        this.imagen = new createjs.Sprite(spray);


        this.movimiento = new createjs.Tween(this.imagen, { loop: -1 });

        this.movimiento.to({ rotation: 360 }, 5000);
        this.movimiento.paused = true;

        //this.imagen.graphics.beginFill("gray").drawCircle(0, 0, 50);
        this.stage.addChild(this.imagen);
        this.iniciar();
    }

    iniciar() {
        this.imagen.on("mousedown", () => {
            //console.log(this.ruleta.mascatas.indexOf(this) != -1)
            if (this.ruleta.mascatas.indexOf(this) != -1) {
                this.ruleta.mascatas.splice(this.ruleta.mascatas.indexOf(this), 1)
                this.ruleta.contenedor.removeChild(this.imagen);
            }

            this.stage.addChild(this.imagen)
            this.imagen.x = this.stage.mouseX;
            this.imagen.y = this.stage.mouseY;

            let angulo = Math.floor(360 / this.ruleta.mascatas.length);


            this.ruleta.mascatas.forEach((m, i) => {
                let x = Math.floor(Math.sin(radianes(angulo * (i + 1))) * 200);
                let y = Math.floor(Math.cos(radianes(angulo * (i + 1))) * 200);
                //console.log(angulo * (i + 1), y, angulo)
                // m.imagen.x = x;
                // m.imagen.y = y;
                createjs.Tween.get(m.imagen).to({ x: x, y: y }, 500)
            });
            this.imagen.gotoAndStop("stop");
            this.movimiento.paused = true;
            this.imagen.rotation = 0;
            this.muted();


        });

        this.imagen.on("pressmove", () => {
            this.imagen.x = this.stage.mouseX;
            this.imagen.y = this.stage.mouseY;
        });


        this.imagen.on("pressup", () => {
            this.imagen.x = this.stage.mouseX;
            this.imagen.y = this.stage.mouseY;
            let contenedor = this.ruleta.contenedor;
            let tam = contenedor.getBounds();

            if (this.ruleta.ruleta.hitTest(this.stage.mouseX - contenedor.x + tam.width / 2, this.stage.mouseY - contenedor.y + tam.height / 2)) {
                this.stage.removeChild(this.imagen);
                this.imagen.x = 0;
                this.imagen.y = 0;
                contenedor.addChild(this.imagen);
                this.ruleta.mascatas.push(this);
                this.imagen.gotoAndPlay("run");
                let angulo = Math.floor(360 / this.ruleta.mascatas.length);

                this.movimiento.paused = false;
                this.unmuted();

                this.ruleta.mascatas.forEach((m, i) => {
                    let x = Math.floor(Math.sin(radianes(angulo * (i + 1))) * 200);
                    let y = Math.floor(Math.cos(radianes(angulo * (i + 1))) * 200);
                    //console.log(angulo * (i + 1), y, angulo)
                    // m.imagen.x = x;
                    // m.imagen.y = y;
                    createjs.Tween.get(m.imagen).to({ x: x, y: y }, 500)
                });
            }

            this.stage.update();
        });


    }

    mover(x: number, y: number) {
        this.imagen.x = x;
        this.imagen.y = y;
    }

    cargarSonido(url: string) {
        this.cargar.loadFile({ id: url, src: url });
        this.cargar.on("complete", (sound) => {
            this.sonido = createjs.Sound.createInstance(url);
            this.sonido.muted = true;
        });
    }

    playSound() {
        if (this.sonido != null) {
            this.sonido.play();
            this.sonido.loop = 1;
        }

    }

    play() {
        if (this.sonido != null) {
           
            this.sonido.paused = false;
        }
    }

    stop() {
        if (this.sonido != null) {
            this.sonido.paused = true;
        }
    }

    muted() {
        if (this.sonido != null) {
            this.sonido.muted = true;
        }
    }
    unmuted() {
        if (this.sonido != null) {
            this.sonido.muted = false;
        }
    }
}



