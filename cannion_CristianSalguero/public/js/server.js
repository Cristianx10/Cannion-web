var express = require('express');
var exphbs = require('express-handlebars');

var app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

var contexto = {
    productos: [
        {
            titulo:"collar",
            imagen:"./images/productos/correa.png",
            descripcion:"Es un producto para mascotas que le permitira controlar a su mascota en cualquier momento",
            precio:"25.000",
        },
        {
            titulo:"correa",
            imagen:"./images/productos/correa.png",
            descripcion:"Es un producto para mascotas que le permitira controlar a su mascota en cualquier momento",
            precio:"35.000",
        },
        {
            titulo:"lazo",
            imagen:"./images/productos/correa.png",
            descripcion:"Es un producto para mascotas que le permitira controlar a su mascota en cualquier momento",
            precio:"15.000",
        },
        {
            titulo:"lazo",
            imagen:"./images/productos/correa.png",
            descripcion:"Es un producto para mascotas que le permitira controlar a su mascota en cualquier momento",
            precio:"15.000",
        },
        {
            titulo:"lazo",
            imagen:"./images/productos/correa.png",
            descripcion:"Es un producto para mascotas que le permitira controlar a su mascota en cualquier momento",
            precio:"15.000",
        },
        {
            titulo:"lazo",
            imagen:"./images/productos/correa.png",
            descripcion:"Es un producto para mascotas que le permitira controlar a su mascota en cualquier momento",
            precio:"15.000",
        },
        {
            titulo:"lazo",
            imagen:"./images/productos/correa.png",
            descripcion:"Es un producto para mascotas que le permitira controlar a su mascota en cualquier momento",
            precio:"15.000",
        },
        {
            titulo:"comida",
            imagen:"./images/productos/correa.png",
            descripcion:"Es un producto para mascotas que le permitira controlar a su mascota en cualquier momento",
            precio:"50.000",
        }
    ]
};

app.get('/', function(request, response){
    response.render('tienda', contexto);
});

app.get('/tienda/:producto', function(request, response) {
    let contenido = null;
    contexto.productos.forEach(function(producto){
        if(producto.titulo == request.params.producto){
            contenido = producto;
            console.log(contenido);
            return;
        }
    });

    if(contenido != null){
        response.render('producto', contenido);
    }

});



app.listen(3000);