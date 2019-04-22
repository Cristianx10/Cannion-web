var express = require('express');
var exphbs = require('express-handlebars');

var app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

var productos = [
    {
        titulo:"collar",
        descripcion:"Es un producto para mascotas que le permitira controlar a su mascota en cualquier momento"
    }
];

app.get('/', function(request, response){
    var contexto = {
        titulo: 'Página principal',
    };
    response.render('tienda', contexto);
});

/*
app.post('/login', function(request, response){
    // crear un archivo con la información del usuario
    console.log(request.body);
    // redireccionar a otra página
    response.redirect('/bienvenida');
});*/

app.listen(3000);