var formularioBajas;
// funcion que agrega las nuevas filas a la tabla
function agregarBajas(bajas){
    var table = $('#dataTables-example').DataTable();

    for(var i=0 ; bajas[i] ; i++){
        var baja = bajas[i],
            nombre = baja.nombreProducto,
            codigo = baja.codigo,
            cantidad = baja.cantidad,
            usuario = baja.nombreUsuario,
            tecnica = 'Sin tecnica',
            fecha = getFecha(baja.fecha);

        table.row.add([
            codigo,
            nombre,
            cantidad,
            usuario,
            tecnica,
            fecha  
        ]);    
    } 
}

// funcion que agrega las nuevas filas a la tabla
function agregarBajasBasicos(bajasBasicos){
    var table = $('#dataTables-example').DataTable();
    
    for(var i=0 ; bajasBasicos[i] ; i++){
        var bajaBasico = bajasBasicos[i],
            nombre = bajaBasico.nombreProducto,
            codigo = bajaBasico.codigo,
            cantidad = 1,
            usuario = bajaBasico.nombreUsuario,
            tecnica = bajaBasico.nombreTecnica,
            fecha = getFecha(bajaBasico.fecha);

        table.row.add([
            codigo,
            nombre,
            cantidad,
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
function obtenerBajas() {
    $.ajax({
        url: '/historial/bajas',
        type: 'POST',
        data: formularioBajas.serialize(),
        success : function(data) {
            // Bajas
            agregarBajas(data.bajas);
            agregarBajasBasicos(data.bajasBasicos);
            // recarga la tabla
            $('#dataTables-example').DataTable().draw();
        }
    });
}

// obtencion de los datos para el top ten
function reiniciarBajas() {
    $.ajax({
        url: '/historial/bajas',
        type: 'POST',
        data: formularioBajas.serialize(),
        success : function(data) {
            // Bajas
            eliminaFilas();
            agregarBajas(data.bajas);
            agregarBajasBasicos(data.bajasBasicos);
            // recarga la tabla
            $('#dataTables-example').DataTable().draw();
        }
    });
}

// funcion principal
$(function(){ 
    // obtengo el formulario del almacen
    formularioBajas = $('#formbaja');
    obtenerBajas();

    $("input[name=inicio]").change(function(){
        reiniciarBajas();
    });

    $("input[name=final]").change(function(){
        reiniciarBajas();
    });

    $("select[name=plaza]").change(function(){
        reiniciarBajas();
    });

    $("select[name=categoria]").change(function(){
        reiniciarBajas();
    });
});