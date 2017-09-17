var formularioMovimiento;
// funcion que agrega las nuevas filas a la tabla
function agregarMovimientos(movimientos){
    var table = $('#dataTables-example').DataTable();

    for(var i=0 ; movimientos[i] ; i++){
        var movimiento = movimientos[i],
            nombre = movimiento.nombreProducto,
            codigo = movimiento.codigo,
            cantidad = movimiento.cantidad,
            tipo = (movimiento.tipo === 0 ) ? 'Paso a consumo' : 'Agrego producto' ,
            usuario = movimiento.nombreUsuario,
            tecnica = 'Sin tecnica',
            fecha = getFecha(movimiento.fecha);

        table.row.add([
            codigo,
            nombre,
            cantidad,
            tipo,
            usuario,
            tecnica,
            fecha  
        ]);    
    } 
}

// funcion que agrega las nuevas filas a la tabla
function agregarAsignaciones(asignaciones){
    var table = $('#dataTables-example').DataTable();
    
    for(var i=0 ; asignaciones[i] ; i++){
        var asignacion = asignaciones[i],
            nombre = asignacion.nombreProducto,
            codigo = asignacion.codigo,
            cantidad = 1,
            tipo = 'Paso a consumo',
            usuario = asignacion.nombreUsuario,
            tecnica = asignacion.nombreTecnica,
            fecha = getFecha(asignacion.fecha);

        table.row.add([
            codigo,
            nombre,
            cantidad,
            tipo,
            usuario,
            tecnica,
            fecha  
        ]);    
    } 
}

function getFecha(fecha){
    var date = new Date(fecha), // casteo a fecha
        month = ponerCero( date.getMonth() ), 
        day = ponerCero( date.getDate() ), 
        hour = ponerCero( date.getHours() ), 
        minute = ponerCero( date.getMinutes() ), 
        second = ponerCero( date.getSeconds() ),
        year = date.getFullYear();

    return '' + year + '/' + month + '/' + day + ' ' + hour + ':' + minute + ':' + second;
}

function ponerCero(numero){
    return (numero < 10) ? '0'+numero : numero;
}

// elimina todas las filas de la tabla, menos la principal
function eliminaFilas(){
  $('#dataTables-example').DataTable().clear().draw();
};

// obtencion de los datos para el top ten
function obtenerMovimientos() {
    $.ajax({
        url: '/historial/movimientos',
        type: 'POST',
        data: formularioMovimiento.serialize(),
        success : function(data) {
            console.log(data)
            // Movimientos
            agregarMovimientos(data.movimientos);
            agregarAsignaciones(data.asignaciones);
            // recarga la tabla
            $('#dataTables-example').DataTable().draw();
        }
    });
}

// obtencion de los datos para el top ten
function reiniciarMovimientos() {
    $.ajax({
        url: '/historial/movimientos',
        type: 'POST',
        data: formularioMovimiento.serialize(),
        success : function(data) {
            console.log(data)
            // Movimientos
            eliminaFilas();
            agregarMovimientos(data.movimientos);
            agregarAsignaciones(data.asignaciones);
            // recarga la tabla
            $('#dataTables-example').DataTable().draw();
        }
    });
}

// funcion principal
$(function(){ 
    // obtengo el formulario del almacen
    formularioMovimiento = $('#formmovimiento');
    obtenerMovimientos();

    $("input[name=inicio]").change(function(){
        reiniciarMovimientos();
    });

    $("input[name=final]").change(function(){
        reiniciarMovimientos();
    });

    $("select[name=plaza]").change(function(){
        reiniciarMovimientos();
    });

    $("select[name=categoria]").change(function(){
        reiniciarMovimientos();
    });

});
