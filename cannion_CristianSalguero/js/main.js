var eventos = [];
function registrar(dia, mes, titulo, informacion) {
  var evento = [dia, mes, titulo, informacion];
  eventos.push(evento);
}

registrar(
  1,
  2,
  "Caminata de la solidaridad",
  "Este evento se llevara a cabo en la plaza principal, por favor estar atento a las posible eventos que alli se registren"
);


console.log(eventos);
