var Almacen = /** @class */ (function () {
    function Almacen(id) {
        this.id = id;
        this.contador = document.createElement("p");
        var data = JSON.parse(localStorage.getItem(id));
        if (data != null) {
            this.datos = data.datos;
        }
        else {
            this.datos = new Array();
        }
    }
    Almacen.prototype.contarCon = function (tipo) {
        var salida = [];
        this.datos.forEach(function (d) {
            if (d.id == tipo) {
                salida.push(d);
            }
        });
        this.contador.innerText = salida.length + "";
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
    Almacen.prototype.obtenerObjecto = function (tipo) {
        var salida = [];
        this.datos.forEach(function (d) {
            if (d.valor.id != null && d.valor.id == tipo) {
                salida.push(d);
            }
            else if (d.valor.nombre != null && d.valor.nombre == tipo) {
                salida.push(d);
            }
        });
        return salida;
    };
    Almacen.prototype.vaciar = function (tipo) {
        var _this = this;
        this.datos.forEach(function (d, index) {
            if (d.id == tipo) {
                _this.datos.splice(index, 1);
            }
        });
        localStorage.setItem(this.id, JSON.stringify(this));
    };
    Almacen.prototype.eliminar = function (tipo) {
        var _this = this;
        this.datos.forEach(function (d, index) {
            if (d.valor.id != null && d.valor.id == tipo) {
                _this.datos.splice(index, 1);
            }
            else if (d.valor.nombre != null && d.valor.nombre == tipo) {
                _this.datos.splice(index, 1);
            }
        });
        localStorage.setItem(this.id, JSON.stringify(this));
    };
    Almacen.prototype.limpiar = function () {
        this.datos = [];
        localStorage.setItem(this.id, JSON.stringify(this));
    };
    return Almacen;
}());
