function apaginaCargada() {
  let data = new Almacen("tienda");

  let articulos = document.querySelectorAll(".articulo");
  let agregar = [];
  /*
            console.log(articulos)
    */
  articulos.forEach(articulo => {
    let agrega = {
      selector: articulo.querySelector(".articulo__informacion__agregar"),
      origen: articulo
    };
    agrega.selector.addEventListener("click", () => {
      let nombre = agrega.origen.querySelector(".articulo__informacion__titulo")
        .innerHTML;
      let precio = parseInt(
        agrega.origen
          .querySelector(".articulo__informacion__precio")
          .innerHTML.replace("$", "")
          .replace(".", "")
      );
      let imagen = agrega.origen.querySelector(
        ".articulo__imagen__imagen > img"
      ).src;
      let informacion = agrega.origen.querySelector(
        ".articulo__informacion__descripcion"
      ).innerHTML;

      data.agregarProducto({
        nombre: nombre,
        precio: precio,
        imagen: imagen,
        informacion: informacion
      });
    });
    agregar.push(agrega);
  });

  let filtros__check__precio = document.querySelectorAll(".filtros #precio");
  let rutaPrecio = "";
  let rutaEnvio = "";
  let rutaMarca = "";
  let rutaEtapa = "";
  let vprecio = false;
  let venvio = false;
  let vmarca = false;
  let vetapa = false;

  function actualizarPrecio(f) {
    let intpu = f.querySelector("input");
    if (intpu.checked) {
      rutaPrecio = f.id + "=" + intpu.value + "&";
    }
  }

  filtros__check__precio.forEach(f => {
    actualizarPrecio(f);
    f.addEventListener("mouseup", () => {
      let intpu = f.querySelector("input");
      if (intpu.checked) {
        rutaPrecio = "";
        setTimeout(() => {
          intpu.checked = false;
        }, 5);
      } else {
        rutaPrecio = f.id + "=" + intpu.value + "&";
      }

      actualizandoRuta();
    });
  });

  let filtros__check__marca = document.querySelectorAll(".filtros #marca");

  function actualizarMarca(f) {
    let intpu = f.querySelector("input");
    if (intpu.checked) {
      rutaMarca = f.id + "=" + intpu.value + "&";
    }
  }

  filtros__check__marca.forEach(f => {
    actualizarMarca(f);
    f.addEventListener("mouseup", () => {
      let intpu = f.querySelector("input");
      if (intpu.checked) {
        rutaMarca = "";
        setTimeout(() => {
          intpu.checked = false;
        }, 5);
      } else {
        rutaMarca = f.id + "=" + intpu.value + "&";
      }
      actualizandoRuta();
    });
  });

  let filtros__check__etapa = document.querySelectorAll(".filtros #etapa");

  function actualizarEtapa(f) {
    let intpu = f.querySelector("input");
    if (intpu.checked) {
      rutaEtapa = f.id + "=" + intpu.value + "&";
    }
  }

  filtros__check__etapa.forEach(f => {
    actualizarEtapa(f);
    f.addEventListener("mouseup", () => {
      let intpu = f.querySelector("input");
      if (intpu.checked) {
        setTimeout(() => {
          intpu.checked = false;
        }, 5);
        rutaEtapa = "";
      } else {
        rutaEtapa = f.id + "=" + intpu.value + "&";
      }
      actualizandoRuta();
    });
  });

  let filtros__check__envio = document.querySelectorAll(".filtros #envio");

  function actualizarEnvio(f) {
    let intpu = f.querySelector("input");
    if (intpu.checked && rutaEnvio == "") {
      rutaEnvio = f.id + "=" + intpu.value + "&";
    }
  }

  filtros__check__envio.forEach(f => {
    actualizarEnvio(f);
    f.addEventListener("mouseup", () => {
      let intpu = f.querySelector("input");
      if (intpu.checked) {
        setTimeout(() => {
          intpu.checked = false;
        }, 5);
        rutaEnvio = "";
      } else {
        rutaEnvio = f.id + "=" + intpu.value + "&";
      }
      actualizandoRuta();
    });
  });

  function actualizandoRuta() {
    let ruta = "/" + rutaEnvio + rutaEtapa + rutaMarca + rutaPrecio;

    location.href = "/tienda" + ruta;
  }

  /*
    console.log(data.getValor());
    console.log(data.getNumero());
*/

let numCarrito = document.querySelector(".carrito__numero");
let numCarritoB = document.querySelector(".carrito__icono");
let numArituclos = document.querySelector(".carrito_num_articulos");

  numCarritoB.append(data.getNumeroB());
  numCarrito.append(data.getNumero());
  numArituclos.append(data.getValor());
}

window.addEventListener("load", apaginaCargada);
