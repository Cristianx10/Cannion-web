var Almacen = /** @class */ (function () {
    function Almacen(id) {
        this.id = id;
        var data = JSON.parse(localStorage.getItem(id));
        if (data != null) {
            this.datos = data.datos;
        }
        else {
            this.datos = new Array();
        }
    }
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
    return Almacen;
}());