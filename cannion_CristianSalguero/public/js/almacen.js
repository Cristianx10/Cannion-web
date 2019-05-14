var formatNumbero = {
    separador: ".", // separador para los miles
    sepDecimal: ',', // separador para los decimales
    formatear: function (num) {
        num += '';
        var splitStr = num.split('.');
        var splitLeft = splitStr[0];
        var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
        var regx = /(\d+)(\d{3})/;
        while (regx.test(splitLeft)) {
            splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
        }
        return this.simbol + splitLeft + splitRight;
    },
    new: function (num, simbol) {
        this.simbol = simbol || '';
        return this.formatear(num);
    }
}

var Almacen = /** @class */ (function () {
    function Almacen(id) {
        this.id = id;
        this.contador = document.createElement("p");
        this.precio = document.createElement("p");
        var data = JSON.parse(localStorage.getItem(id));
        if (data != null) {
            this.datos = data.datos;
            this.productos = data.productos;
            this.calcularPrecio();
        }
        else {
            this.datos = new Array();
            this.productos = new Array();
            this.precio.innerText = "$0";
        }
        this.contador.innerText = this.productos.length + "";
    }
    Almacen.prototype.agregarProducto = function (valores) {
        var temp = { id: "producto#" + (this.productos.length + 1), valor: valores };
        this.productos.push(temp);
        localStorage.setItem(this.id, JSON.stringify(this));
        this.contador.innerText = this.productos.length + "";
        this.calcularPrecio();
    };
    Almacen.prototype.calcularPrecio = function () {
        var valor = 0;
        this.productos.forEach(function (p, index) {
            if (p.valor.costo != null) {
                valor += p.valor.costo;
            }
            else if (p.valor.precio != null) {
                valor += p.valor.precio;
            }
        });
        this.precio.innerHTML = "$" + formatNumbero.new(valor) + "";
    };
    Almacen.prototype.removerProducto = function (id) {
        var _this = this;
        this.productos.forEach(function (p, index) {
            if (p.id == id) {
                _this.productos.splice(index, 1);
            }
        });
        console.log(this.productos);
        localStorage.setItem(this.id, JSON.stringify(this));
        this.contador.innerText = this.productos.length + "";
        this.calcularPrecio();
    };
    Almacen.prototype.vaciarCarrito = function (tipo) {
        this.productos = [];
        localStorage.setItem(this.id, JSON.stringify(this));
        this.calcularPrecio();
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
        this.productos = [];
        localStorage.setItem(this.id, JSON.stringify(this));
    };
    Almacen.prototype.getNumero = function () {
        return this.contador;
    };
    Almacen.prototype.getValor = function () {
        return this.precio;
    };
    Almacen.prototype.getProductos = function () {
        return this.productos;
    };
    return Almacen;
}());
