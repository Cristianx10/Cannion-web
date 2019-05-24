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
    ruleta: createjs.Shape;
    movimiento: createjs.Tween;
    mascatas: Array<Mascotas>;

    constructor() {
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

    iniciar() {
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

        this.stage.on("stagemousedown", () => {
            // this.movimiento.paused = !this.movimiento.paused;
        });

        createjs.Ticker.addEventListener("tick", this.stage);
        this.stage.update();
    }

    agregar() {
        let pet = new Mascotas(this);
       

     


        this.stage.update();


    }

    incluirEn(ubicacion: string) {
        let elemento: HTMLElement = <HTMLElement>document.querySelector(ubicacion);
        elemento.append(this.canvas);

    }
}

class Mascotas {

    ruleta: Ruleta;
    stage: createjs.Stage;
    imagen: createjs.Shape;

    constructor(ruleta: Ruleta) {
        this.ruleta = ruleta;
        this.stage = this.ruleta.stage;
        this.imagen = new createjs.Shape();
        this.imagen.graphics.beginFill("gray").drawCircle(0, 0, 50);
        this.stage.addChild(this.imagen);
        this.iniciar();
    }

    iniciar() {
        this.imagen.on("mousedown", () => {
            console.log(this.ruleta.mascatas.indexOf(this) != -1)
            if(this.ruleta.mascatas.indexOf(this) != -1){
                this.ruleta.mascatas.splice(this.ruleta.mascatas.indexOf(this), 1)
                this.ruleta.contenedor.removeChild(this.imagen);
            }
            
            this.stage.addChild(this.imagen)
            this.imagen.x = this.stage.mouseX;
            this.imagen.y = this.stage.mouseY;

            let angulo = Math.floor(360 / this.ruleta.mascatas.length);
         

            this.ruleta.mascatas.forEach((m, i) => {
                let x = Math.floor(Math.sin(radianes(angulo*(i+1))) * 200);
                let y = Math.floor(Math.cos(radianes(angulo*(i+1))) * 200);
                console.log(angulo*(i+1), y, angulo)
               // m.imagen.x = x;
               // m.imagen.y = y;
                createjs.Tween.get(m.imagen).to({x:x, y:y}, 500)
            });
           
            
            
        });

        this.imagen.on("pressmove", () => {
            this.imagen.x = this.stage.mouseX;
            this.imagen.y = this.stage.mouseY;
        });


        this.imagen.on("pressup", () => {
            this.imagen.x = this.stage.mouseX;
            this.imagen.y = this.stage.mouseY;
            let contenedor = this.ruleta.contenedor;
            
            if (this.ruleta.ruleta.hitTest(this.stage.mouseX - contenedor.x, this.stage.mouseY - contenedor.y)) {
                this.stage.removeChild(this.imagen);
                this.imagen.x = 0;
                this.imagen.y = 0;
                contenedor.addChild(this.imagen);
                this.ruleta.mascatas.push(this);
                
                let angulo = Math.floor(360 / this.ruleta.mascatas.length);
         
                this.ruleta.mascatas.forEach((m, i) => {
                    let x = Math.floor(Math.sin(radianes(angulo*(i+1))) * 200);
                    let y = Math.floor(Math.cos(radianes(angulo*(i+1))) * 200);
                    console.log(angulo*(i+1), y, angulo)
                   // m.imagen.x = x;
                   // m.imagen.y = y;
                    createjs.Tween.get(m.imagen).to({x:x, y:y}, 500)
                });
            }

            this.stage.update();
        });





    }
}


let juego = new Ruleta();

juego.agregar();
juego.agregar();
juego.agregar();
juego.agregar();







juego.incluirEn("#juego");

