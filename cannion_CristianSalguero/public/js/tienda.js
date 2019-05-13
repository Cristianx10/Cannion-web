function selector(url){
    let ref = document.querySelector(url);
    if(ref == null){
      console.log("La referencia: " + url + " es nula.");
    }
    return ref;
}

function paginaCargada(eventglobal){
    var navegacion = selector(".navegacion__prin");
    var filtros = selector(".filtros");
    
    var zona = {};
    
    zona.navegacion__escritorio = selector(".cabecera__prin__cont__cabecera__navegacion");
    zona.navegacion__celular = selector(".menu__navegacion");
    zona.navegacion__celular__icono = selector(".menu__icono");
    
    zona.filtro__escritorio = selector(".cont__filtros");
    zona.filtro__celular = selector(".filtro__navegacion");
    zona.filtro__celular__icono = selector("#filtros > .icono");
    
    
    function cambiodepantalla(e) {
  
      let width = e.currentTarget.innerWidth;
    
      if(width <= 480){
          zona.navegacion__celular.append(navegacion);
          zona.navegacion__celular.classList.remove("seleccionado");

          zona.filtro__celular.append(filtros);
          
      }else{
          zona.navegacion__escritorio.append(navegacion);
          zona.navegacion__celular.classList.remove("seleccionado");

          zona.filtro__escritorio.append(filtros);
      }
     
    }

    zona.navegacion__celular__icono.addEventListener("click", ()=>{
        zona.navegacion__celular.classList.toggle("seleccionado");
        zona.filtro__celular.classList.remove("seleccionado");
    });

    zona.filtro__celular__icono.addEventListener("click", ()=>{
        zona.filtro__celular.classList.toggle("seleccionado");
        zona.navegacion__celular.classList.remove("seleccionado");
    });
    
    cambiodepantalla(eventglobal);
    window.addEventListener("resize", cambiodepantalla);

}

window.addEventListener("load", paginaCargada);

