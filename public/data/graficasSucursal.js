var datosSucursal;
var productos; // nombre de los productos no basicos
var bajasBasicos;//agarro las bajas con tecnica
var tecnicas;///para nombres de tecnicas
var objetoBasicos;//para el json
var columnasGrafica;//para saber cuantas columnas seran
var productoElegido;//para agarrar el producto elegido
var datos;//para los datos de la grafica
var options;//para las opciones de la grafica
var grafica;//para la grafica
// funcion que obtiene el nombre de los productos
function obtenerNombres(productos){
  var arregloNombres = [];
  // ciclo para obtener los nombres
  for(var i = 0 ; productos[i] ; i++){
    // obtengo los nombres de los productos
    arregloNombres.push(productos[i].nombre);
  }
  return arregloNombres;
}
// obtiene las bajas de productos
function obtenerBajas(productos,bajasDeProductos){
  var bajas=[];
  // obtener la cantidad de bajas por productos no basicos
  for(let producto of productos){
    var suma = 0;
    for(let bajaProducto of bajasDeProductos){
      if(producto == bajaProducto.producto.nombre){
        suma+=bajaProducto.cantidad;
      }
    }
    // guardo la cantidad de bajas del producto
    bajas.push({"nombre":producto,"cantidad":suma})
  }
  // ordeno los productos
  bajas.sort(function(a, b){return (b.cantidad-a.cantidad)})
  return bajas;
}
// funcion que agrega las nuevas filas a la tabla
function agregarFilas(bajas){
  for(var i=0 ; bajas[i] && i<10 ; i++){
    var nombre = bajas[i].nombre;
    var cantidad = bajas[i].cantidad;
    $('#dataTables-example tr:last').after('<tr><td>'+nombre+'</td><td>'+cantidad+'</td></tr>');
  }
}
// filtra las bajas por rango de fecha
function bajasFecha(bajas){
  // obtengo las fechas
  var fechaInicial = ( new Date( $('input[name=inicioP]').val() ) ).getTime();
  var fechaFinal = ( new Date( $('input[name=finalP]').val() ) ).getTime() + 86400000;
  if(!fechaFinal) fechaFinal=new Date();
  if(!fechaInicial) fechaInicial=(new Date(1995,11,17)-2.628e+9);
  // realizo el filtro por rango de fecha
  var bajasProductos = bajas.filter(function(baja){
    // obtengo la fecha de la baja
    var bajaFecha = (new Date(baja.fecha)).getTime();
    var comparacion = (bajaFecha >= fechaInicial) && (bajaFecha <= fechaFinal);
    return comparacion;
  });
  return bajasProductos;
}
// elimina todas las filas de la tabla, menos la principal
function eliminaFilas(){
  // Obtenemos el total de columnas (tr) del id "dataTables-example"
  var trs=$("#dataTables-example tr").length;
  for(var i=1 ; i<trs ; i++){
    // Eliminamos la ultima columna
    $("#dataTables-example tr:last").remove();
  }
};
// genera el top ten de productos
function generarTopTen(datos){
  eliminaFilas(); // elimino las filas
  // si no he inicializado productos
  if(!productos) productos = obtenerNombres(datos.productos);
  // obtengo las bajas por rango de fecha
  var bajasProductos = bajasFecha(datos.bajasProductos);
  var bajas = obtenerBajas(productos,bajasProductos);
  agregarFilas(bajas);
}
//obtener nombres de las tecnicas
function obtenerNombresTecnicas(tecnicas){
  var arregloNombres = [];
  columnasGrafica=0;
  // ciclo para obtener los nombres
  for(var i = 0 ; tecnicas[i] ; i++){
    // obtengo los nombres de los productos
    columnasGrafica++;
    arregloNombres.push(tecnicas[i].nombreCompleto);
  }
  return arregloNombres;
}
//filtrar fecha
function bajasBasicosFecha(bajas){
  // obtengo las fechas
  var fechaInicial = ( new Date( $('input[name=inicioB]').val() ) ).getTime();
  var fechaFinal = ( new Date( $('input[name=finalB]').val() ) ).getTime() + 86400000;
  if(!fechaFinal) fechaFinal=new Date();
  if(!fechaInicial) fechaInicial=(new Date(1995,11,17)-2.628e+9);
  // realizo el filtro por rango de fecha
  var bajasProductos = bajas.filter(function(baja){
    // obtengo la fecha de la baja
    var bajaFecha = (new Date(baja.fecha)).getTime();
    var comparacion = (bajaFecha >= fechaInicial) && (bajaFecha <= fechaFinal);
    return comparacion;
  });
  return bajasProductos;
}
//obtener las bajas de los basicos de cada tecnica
function obtenerBajasBasicos(tecnicas,bajasBasicos){
  var bajas=[];
  columnaGrafica=0;
  //obtengo el producto que esta seleccionado en el select
  var productoElegido=$("select[name=basico]").val();
  // obtener la cantidad de bajas por productos no basicos
  for(let tecnica of tecnicas){
    var suma = 0;
    for(let bajaBasico of bajasBasicos){
      if(tecnica == bajaBasico.tecnica.nombreCompleto){
        if(productoElegido == bajaBasico.producto.nombre){
          suma+=bajaBasico.cantidad;
        }
      }
    }
    // guardo la cantidad de bajas del producto por tecnica
    bajas.push({"tecnica":tecnica,"cantidad":suma})
  }
  // ordeno los productos
  //bajas.sort(function(a, b){return (b.cantidad-a.cantidad)})
  return bajas;
}
// dibuja la grafica de comparar basicos por tecnica inicial
function graficaBasicos(){
  console.log(bajasBasicosFecha(datosSucursal.bajasBasicos));
  tecnicas = obtenerNombresTecnicas(datosSucursal.tecnicas);
  bajasBasicos= bajasBasicosFecha(datosSucursal.bajasBasicos);
  objetoBasicos = obtenerBajasBasicos(tecnicas,bajasBasicos);
  dibujar();
}
// dibuja la grafica de comparar basicos por tecnica inicial
function dibujar(){
  google.charts.load('current', {packages: ['corechart', 'bar']});
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {
    //son las llaves para acceder al arreglo de objetoBasicos
    //var keys = Object.keys(objetoBasicos);
    datos = new google.visualization.DataTable();
    datos.addColumn('string', "Nombre");
    datos.addColumn('number', "Cantidad");
    for (i=0; i<columnasGrafica;i++){
      datos.addRow([objetoBasicos[i].tecnica,objetoBasicos[i].cantidad]);
    }
    options = {
      title: 'Basicos Usados por Tecnica',
      hAxis: {title: 'Tecnica',  titleTextStyle: {color: '#333'}},
      vAxis: {title: 'Cantidad',  titleTextStyle: {color: '#333'}, minValue: 0},
      legend: { position: 'none' },
      bar: { groupWidth: "80%" },
      width: 900,
      height: 400
    };
    grafica = new google.visualization.ColumnChart(document.getElementById('grafica'));
    grafica.draw(datos, options);
  }
}
// redibuja la grafica de comparar basicos por tecnica
function redibujar(){
  objetosBasicos=[];
  bajasBasicos= bajasBasicosFecha(datosSucursal.bajasBasicos);
  objetoBasicos = obtenerBajasBasicos(tecnicas,bajasBasicos);
  google.charts.load('current', {packages: ['corechart', 'bar']});
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {
    //son las llaves para acceder al arreglo de objetoBasicos
    //var keys = Object.keys(objetoBasicos);
    datos = new google.visualization.DataTable();
    datos.addColumn('string', "Nombre");
    datos.addColumn('number', "Cantidad");
    for (i=0; i<columnasGrafica;i++){
      datos.addRow([objetoBasicos[i].tecnica,objetoBasicos[i].cantidad]);
    }
    grafica = new google.visualization.ColumnChart(document.getElementById('grafica'));
    grafica.draw(datos, options);
  }
}
// funcion principal
$(function(){
  $.ajax({
    url: '/historial/datosSucursal',
    type: 'GET',
    success : function(data) {
      datosSucursal = data;
      // graficas iniciales
      // top ten
      generarTopTen(datosSucursal);
      // general la grafica inicial
      graficaBasicos();
    }
  });
  // fechas para el top ten
  $("input[name=inicioP]").change(function(){
    generarTopTen(datosSucursal);
	});
  $("input[name=finalP]").change(function(){
    generarTopTen(datosSucursal);
	});
  // fecha para los basicos por tecnica
  $("input[name=inicioB]").change(function(){
		redibujar();
	});
  $("input[name=finalB]").change(function(){
		redibujar();
	});
  // select del producto basico
  $("select[name=basico]").change(function(){
    redibujar();
  });
});
