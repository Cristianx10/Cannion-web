function selector(url) {
  let ref = document.querySelector(url);
  if (ref == null) {
    console.log("La referencia: " + url + " es nula.");
  }
  return ref;
}

function apaginaCargada() {
  let data = new Almacen("tienda");
  console.log(data.getValor());

  /*
            console.log(articulos)
    */
  let agrega = selector(".informacion__agregar");
  let compra = selector("#btn_comprar");

  function accionagregar(){
    let nombre = selector(".articulo__informacion__titulo").innerHTML;

    let precio = parseInt(
      selector(".articulo__informacion__precio")
        .innerHTML.replace("$", "")
        .replace(".", "")
    );
    let imagen = selector(".articulo__informacion__imagen > img").src;

    let informacion = selector(".articulo__informacion__descripcion").innerHTML;

    data.agregarProducto({
      nombre: nombre,
      precio: precio,
      imagen: imagen,
      informacion: informacion
    });
  }

  agrega.addEventListener("click", () => {
    accionagregar()
  });

  compra.addEventListener("click", () => {
    accionagregar()
    location.href = "/carrito";
  });

  let numCarritoB = document.querySelector(".carrito__icono");
  numCarritoB.append(data.getNumeroB());

  /*
  numCarrito.append(data.getNumero());
  numCarrito.append(data.getValor());*/
}

window.addEventListener("load", apaginaCargada);
