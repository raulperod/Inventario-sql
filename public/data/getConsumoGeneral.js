var formularioConsumo;
// funcion que agrega las nuevas filas a la tabla
function agregarFilas(productos){
    for(var i=0 ; productos[i] ; i++){
        var producto = productos[i],
            nombre = producto.nombreProducto,
            codigo = producto.codigo,
            cantidad = producto.cantidadConsumo;

        getFilas(nombre, codigo, cantidad);
    }
    $('#dataTables-example').DataTable().draw();
}

function getFilas(nombre, codigo, cantidad){
    var table = $('#dataTables-example').DataTable();
    var string1,string2,string3;
    // llenar el string :(
    string1 = '<td>' + nombre + '</td>';
    string2 = '<td>' + codigo + '</td>';
    string3 = '<td>' + cantidad + '</td>';

    table.row.add([
        string2,
        string1,
        string3
    ]);
}

// elimina todas las filas de la tabla, menos la principal
function eliminaFilas(){
    //$("#tbodyid").empty();    
    $('#dataTables-example').DataTable().clear().draw();
};

// obtencion de los datos para el top ten
function obtenerConsumo() {
    $.ajax({
        url: '/consumos',
        type: 'POST',
        data: formularioConsumo.serialize(),
        success : function(data) {
            // Consumo
            agregarFilas(data);
        }
    });
}

// obtencion de los datos para el top ten
function reiniciarConsumo() {
    $.ajax({
        url: '/consumos',
        type: 'POST',
        data: formularioConsumo.serialize(),
        success : function(data) {
            // Almacen
            eliminaFilas();
            agregarFilas(data);
        }
    });
}

// funcion principal
$(function(){ 
    // obtengo el formulario del almacen
    formularioConsumo = $('#formconsumo');
    obtenerConsumo();

    // fechas para el top ten
    $("select[name=plaza]").change(function(){
        reiniciarConsumo();
    });
        // select de sucursal
    $("select[name=categoria]").change(function(){
        reiniciarConsumo();
    });
});