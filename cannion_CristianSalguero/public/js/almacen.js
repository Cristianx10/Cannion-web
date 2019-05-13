var Almacen = /** @class */ (function () {
    function Almacen(id) {
        this.id = id;
        this.contador = document.createElement("p");
        var data = JSON.parse(localStorage.getItem(id));
        if (data != null) {
            this.datos = data.datos;
            this.productos = data.productos;
        }
        else {
            this.datos = new Array();
            this.productos = new Array();
        }
        this.contador.innerText = this.productos.length + "";
    }
    Almacen.prototype.agregarProducto = function (valores) {
        var temp = { id: "producto#" + (this.productos.length + 1), valor: valores };
        this.productos.push(temp);
        localStorage.setItem(this.id, JSON.stringify(this));
        this.contador.innerText = this.productos.length + "";
    };
    Almacen.prototype.removerProducto = function (id) {
        var _this = this;
        this.productos.forEach(function (p, index) {
            if (p.id == id) {
                _this.productos.slice(index, 1);
            }
        });
        localStorage.setItem(this.id, JSON.stringify(this));
        this.contador.innerText = this.productos.length + "";
    };
    Almacen.prototype.vaciarCarrito = function (tipo) {
        this.productos = [];
        localStorage.setItem(this.id, JSON.stringify(this));
    };
    Almacen.prototype.agregar = function (id, valores) {
        var temp = { id: id, valor: valores };
        this.datos.push(temp);
        localStorage.setItem(this.id, JSON.stringify(this));
    };
    Almacen.prototype.obtener = function (tipo) {
        var salida = [];
        this.datos.forEach(function (d) {
            if (d.id == tipo) {
                salida.push(d);
            }
        });
        return salida;
    };
    Almacen.prototype.vaciar = function (tipo) {
        this.datos = [];
        localStorage.setItem(this.id, JSON.stringify(this));
    };
    Almacen.prototype.limpiar = function () {
        this.datos = [];
        localStorage.setItem(this.id, JSON.stringify(this));
    };
    return Almacen;
}());
