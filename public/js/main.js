function carga() {
  var eventos = [];
  var diaActual = 7;
  var calendario = {};
  calendario.dia = document.querySelector(".fecha__especifica__dia");
  calendario.mes = document.querySelector(".fecha__especifica__mes");
  calendario.siguiente = document.querySelector(".fecha__especifica__adelante");
  calendario.anterior = document.querySelector(".fecha__especifica__atras");
  calendario.titulo = document.querySelector(
    ".fecha__especifica__info__titulo"
  );
  calendario.hora = document.querySelector(".fecha__especifica__info__hora");
  calendario.descripcion = document.querySelector(
    ".fecha__especifica__info__descripcion"
  );

  function registrar(dia, mes, titulo, hora, informacion) {
    let info = [mes, titulo, hora, informacion];
    eventos[dia] = info;
  }

  function noFound(numeroBase) {
    calendario.dia.textContent = numeroBase;
    calendario.titulo.textContent = "No se encontro nada";
    calendario.hora.textContent = "00:00 - 00:00";
    calendario.descripcion.textContent = "No hay informacion disponible";
  }

  function eventoEncontrado(numeroBase) {
    let ev = eventos[numeroBase];
    calendario.dia.textContent = numeroBase;
    calendario.titulo.textContent = ev[1];
    calendario.hora.textContent = ev[2];
    calendario.descripcion.textContent = ev[3];
  }

  var dias_html = document.querySelectorAll(".calendario td");

  function recorrerDias(element, index) {
    if (eventos[element.textContent] !== undefined) {
      element.style.background = "gray";
    }

    function clickDias(event) {
      diaActual = element.textContent * 1;
      if (eventos[element.textContent] === undefined) {
        noFound(element.textContent);
      } else {
        eventoEncontrado(element.textContent);
      }
    }

    element.addEventListener("click", clickDias);
  }

  function clickSiguiente() {
    diaActual += 1;
    if (diaActual > 28) {
      diaActual = 1;
    }
    if (eventos[diaActual] === undefined) {
      noFound(diaActual);
    } else {
      eventoEncontrado(diaActual);
    }
  }

  function clickAnterior() {
    diaActual--;
    if (diaActual < 1) {
      diaActual = 28;
    }
    if (eventos[diaActual] === undefined) {
      noFound(diaActual);
    } else {
      eventoEncontrado(diaActual);
    }
  }

  calendario.siguiente.addEventListener("click", clickSiguiente);
  calendario.anterior.addEventListener("click", clickAnterior);

  registrar(
    1,
    2,
    "Caminata de la solidaridad",
    "09:00 AM - 11:00 AM",
    "Este evento se llevara a cabo en la plaza principal, por favor estar atento a las posible eventos que alli se registren"
  );

  registrar(
    5,
    2,
    "Marcha de concientización",
    "03:00 AM - 10:00 AM",
    "Este evento busca recuperar la conciencia de ayuda para ayudar a los menos afortunados y salir adelante."
  );

  registrar(
    9,
    2,
    "Campaña de vacunacion",
    "02:00 PM - 03:00 AM",
    "Se vacunaran a las mascotas que mas lo necesiten y requieran atencion media urgente."
  );

  registrar(
    13,
    2,
    "Adoptame",
    "05:00 PM - 07:00 PM",
    "Se llevaran varios ejemplares de animales donde se adoptaran varias razas que buscan ser aceptadas."
  );

  registrar(
    21,
    2,
    "Hagamos conciencia",
    "09:00 PM - 10:00 PM",
    "Evento de dibulgación publica que busca hacer conciencia entre las personas."
  );

  registrar(
    28,
    2,
    "Ayudanos a ayudarlos",
    "03:00 PM - 05:00 PM",
    "Hoy podrias ser tu dales una mano y salgamos adelante juntos"
  );

  dias_html.forEach(recorrerDias);

  function siguienteEvento() {}

  calendario.siguiente.addEventListener("click", siguienteEvento);

  var publicidad = {};
  publicidad.cerrar = document.querySelector(".publicidad__cerrar");
  publicidad.ventana = document.querySelector(".publicidad");

  publicidad.cerrar.addEventListener("click", function() {
    publicidad.ventana.style.display = "none";
  });

  var seccion = {};
  seccion.inicio = ".cabecera__prin";
  seccion.somos = ".cont__somos";
  seccion.ayuda = ".cont__como-ayudar";
  seccion.galeria = ".cont__galeria";
  seccion.fecha = ".cont__fecha";
  seccion.tienda = ".cont_tienda";
  seccion.contacto = ".pie-pagina";

  var nav = {};
  nav.inicio = document.querySelector("#nav__inicio");
  nav.quien = document.querySelector("#nav__quien");
  nav.porque = document.querySelector("#nav__porque");
  nav.tienda = document.querySelector("#nav__tienda");
  nav.contacto = document.querySelector("#nav__contacto");
  nav.subir = document.querySelector(".subir");

  console.log(nav.subir);

  function autoScroll(elemento, destino) {
    console.log(elemento, destino);
    elemento.addEventListener("click", function() {
      $(destino).animatescroll();
    });
  }

  autoScroll(nav.inicio, seccion.inicio);
  autoScroll(nav.quien, seccion.somos);
  autoScroll(nav.porque, seccion.ayuda);
  autoScroll(nav.tienda, seccion.tienda);
  autoScroll(nav.contacto, seccion.contacto);
  autoScroll(nav.subir, seccion.inicio);

  //Codigo de visualizacion de la Galeria

  var emergente = document.querySelector(".emergente");
  var fotos = document.querySelectorAll(".cont__galeria img");
  var galeriaSecundaria = document.querySelector(".galeria__secundaria");
  var galeriaEmergenteImagen = document.querySelector(
    ".galeria__secundaria__imagen"
  );
  var galeriaEmergente = document.querySelector(".galeria__secundaria__lista");

  fotos.forEach(function(element, index) {
    if (index === 0) {
      galeriaEmergenteImagen.appendChild(element.cloneNode(true));
    }
    galeriaEmergente.appendChild(element.cloneNode(true));
  });

  galeriaSecundaria.style.height = screen.height - 200 + "px";
  $(window).resize(function() {
    galeriaSecundaria.style.height = screen.height - 200 + "px";
  });

  var gal_fotos = document.querySelectorAll(".galeria__secundaria__lista img");

  gal_fotos.forEach(function(foto, index) {
    var gal = document.querySelector(".galeria__secundaria__imagen img");
    foto.addEventListener("click", function() {
      console.log(foto);
      gal.src = foto.src;
    });
  });

  var cerrar = document.querySelector(".cerrar");

  var abrir = document.querySelector("#ver__galeria");

  abrir.addEventListener("click", function(){
    emergente.style.display = "block";
  });

  cerrar.addEventListener("click", function(){
    emergente.style.display = "none";
  });

}

window.addEventListener("load", carga);
