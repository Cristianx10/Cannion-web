function paginaCargadaCarrito() {
  let data = new Almacen("tienda");

  let listaProductos = document.querySelector(".listaCarrito");
  let productos = data.getProductos();

  productos.forEach((p, index) => {
    if (index == 0) {
      listaProductos.innerHTML = "";
    }
    let item = document.createElement("li");
    let eliminar = document.createElement("button");
    let item__car = {
      item: item,
      eliminar: eliminar
    };
    eliminar.innerHTML = "Eliminar";
    eliminar.className = "p__eliminar articulo__informacion__agregar rojo";

    item.innerHTML = `
        <div id="${p.id}" class="p">
            <div class="p__imagen">
                <img src="${p.valor.imagen}" alt="">
                <h3 class="numero">${p.valor.precio}</h3>
            </div>
            <div class="p__informacion">
                <div class="p__contenido">
                    <h2>${p.valor.nombre}</h2>
                    
                    <p>${p.valor.informacion}</p>
                </div>
                <div class="p__eliminar">

                </div>  
            </div>
        </div>
        `;
    let zona__boton = item.querySelector(".p__eliminar");

    zona__boton.append(eliminar);

    item__car.eliminar.addEventListener("click", () => {
      data.removerProducto(p.id);
      listaProductos.removeChild(item__car.item);
    });

    listaProductos.append(item);
  });

  let numCarrito = document.querySelector(".carrito__numero #numero");
  let totalCarrito = document.querySelector(".carrito__numero #total");

  numCarrito.append(data.getValor());
  totalCarrito.append(data.getNumero());
}

window.addEventListener("load", paginaCargadaCarrito);
