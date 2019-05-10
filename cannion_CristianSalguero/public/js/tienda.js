var navegacion = document.querySelector(".navegacion__prin");
var filtros = document.querySelector(".navegacion__prin");

var zona = {};

zona.navegacion__escritorio = document.querySelector(".cabecera__prin__cont__cabecera__navegacion");
zona.navegacion__celular = document.querySelector(".menu__navegacion");
zona.navegacion__celular__icono = document.querySelector(".menu__icono");

zona.filtro__escritorio = document.querySelector(".cont__filtros");
zona.filtro__celular = document.querySelector("#filtros");
zona.filtro__celular__icono = document.querySelector("#filtros");






function cambiodepantalla(e) {
  let width = e.currentTarget.innerWidth;

  if(width <= 480){
      zona.navegacion__celular.append(navegacion);
      zona.navegacion__celular.classList.remove("seleccionado");
  }else{
      zona.navegacion__escritorio.append(navegacion);
      zona.navegacion__celular.classList.remove("seleccionado");
  }
}


zona.navegacion__celular__icono.addEventListener("click", ()=>{
    zona.navegacion__celular.classList.toggle("seleccionado");
})


window.addEventListener("resize", cambiodepantalla);
window.addEventListener("load", cambiodepantalla);
