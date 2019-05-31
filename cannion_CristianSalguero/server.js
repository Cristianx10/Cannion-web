var express = require("express");
var exphbs = require("express-handlebars");

var app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

const MongoClient = require("mongodb").MongoClient;
const test = require("assert");
// Connection url
const url = "mongodb://localhost:27017";
// Database Name
const dbName = "tienda";
var baseDatos;

const assert = require('assert');

// Connect using MongoClient
MongoClient.connect(
  "mongodb+srv://cristianx10:cluster0-lyy4u.mongodb.net/tienda",
  
  {
    auth:{
      user:"cristianx10",
      password:"contrasenasegura2019zxc"
    }
  }
  , function(err, client) {
  baseDatos = client.db(dbName);

  app.listen(process.env.PORT || 1234);
  //client.close();
});

var contexto = {
  productos: [
    {
      titulo: "collar",
      imagen: "./images/productos/correa.png",
      descripcion:
        "Es un producto para mascotas que le permitira controlar a su mascota en cualquier momento",
      precio: "$25.000"
    },
    {
      titulo: "correa",
      imagen: "./images/productos/correa.png",
      descripcion:
        "Es un producto para mascotas que le permitira controlar a su mascota en cualquier momento",
      precio: "$35.000"
    },
    {
      titulo: "lazo",
      imagen: "./images/productos/correa.png",
      descripcion:
        "Es un producto para mascotas que le permitira controlar a su mascota en cualquier momento",
      precio: "$15.000"
    },
    {
      titulo: "comida",
      imagen: "./images/productos/correa.png",
      descripcion:
        "Es un producto para mascotas que le permitira controlar a su mascota en cualquier momento",
      precio: "$50.000"
    }
  ]
};

app.get("/", function(request, response) {
  response.sendfile("/index.html");
});

app.get("/porque", function(request, response) {
  response.render("porque", {layout:false})
});

/*
app.get("/tienda", function(request, response) {
  let contenido = {};
  let query = {};

  let coleccion = baseDatos.collection("productos");

  coleccion.find(query).toArray(function(err, items) {
    test.equal(null, err);
    contenido.productos = items;
    if (contenido != null) {
      response.render("tienda", contenido);
    }
  });
});*/

app.get("/producto/:item?", function(request, response) {
  let contenido = null;
  let query = {};

  let ite = request.params.item;
  if (ite != null) {
    query = { nombre: ite };
  }

  let coleccion = baseDatos.collection("productos");

  coleccion.find(query).toArray(function(err, items) {
    test.equal(null, err);
    contenido = items;
    if (contenido != null) {
      response.render("producto", contenido[0]);
    }
  });
});

app.get("/tienda/:item?", function(request, response) {
  let contenido = {};

  let info = request.params.item;

  let query = {};
  let opciones = {};
  let temquery = {};

  if (info != null) {
    let filtros = info.split("&");
    filtros.forEach(f => {
      let i = f.split("=");

      if (i[0] == "precio") {
        temquery.precio = i[1];

        if (i[1] == "Menor") {
          opciones = { costo: 1 };
        } else if (i[1] == "Mayor") {
          opciones = { costo: -1 };
        }else if (i[1] == "Normal") {
          opciones = { popularidad: -1 };
        }

      } else if (i[0] == "marca") {
        query.marca = i[1];
      } else if (i[0] == "envio") {
        query.envio = i[1];
      } else if (i[0] == "etapa") {
        query.etapa = i[1];
      }
    });
  }

  let coleccion = baseDatos.collection("productos");

  coleccion
    .find(query)
    .sort(opciones)
    .toArray(function(err, items) {
      test.equal(null, err);

      contenido.productos = items;

      let precio = temquery.precio;
      if (precio == null) {
        precio = "precio";
      }

      let marca = query.marca;
      if (marca == null) {
        marca = "marca";
      }

      let envio = query.envio;
      if (envio == null) {
        envio = "envio";
      }

      let etapa = query.etapa;
      if (etapa == null) {
        etapa = "etapa";
      }

      if (info != null) {
        contenido.query = JSON.parse(
          `{"${marca}":true, "${envio}":true, "${etapa}":true, "${precio}":true}`
        );
      }

      if (contenido != null) {
        response.render("tienda", contenido);
      }
    });
});

app.get("/pedido", function(request, response) {
  response.render("pedido", {});
});

app.post("/enviar", function(request, response) {

  let data = request.body;
  console.log(data);
  let pedido = {
    nombre: data.nombre,
    correo: data.correo,
    direccion: data.direccion,
    telefono: data.telefono,
    pago: data.pago,
    tarjeta: data.tarjeta,
    code: data.tarjeta__codigo,
    fecha: new Date(),
    estado: "En espera"
  };

  let coleccion = baseDatos.collection("pedidos");
  coleccion.insertOne(pedido, function(err) {
    assert.equal(err, null);

    console.log("pedido guardado");
  });

  response.redirect("/");

});

app.get("/envioproductos", function() {});

app.get("/carrito", function(request, response) {
  let contenido = {};
  let query = {};

  response.render("carrito", contenido);
});


app.listen(3000, function() {
  console.log("Escuchando en el puesto 3000");
});
