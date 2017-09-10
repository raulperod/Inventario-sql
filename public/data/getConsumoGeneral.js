var formularioConsumo;
// funcion que agrega las nuevas filas a la tabla
function agregarFilas(productos){
    for(var i=0 ; productos[i] ; i++){
        var producto = productos[i],
            nombre = producto.nombreProducto,
            codigo = producto.codigo,
            cantidad = producto.cantidadConsumo;

        $('#dataTables-example tr:last')
            .after(getFila(nombre, codigo, cantidad));
    }
}

function getFila(nombre, codigo, cantidad){
    var string;
    // llenar el string :(
    string = '<tr class="odd gradeX"><td>' + nombre + '</td><td>' + codigo + '</td><td>' + cantidad + '</td></tr>';
    return string;
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

function ajustarTabla(){
    $('#dataTables-example').DataTable();
}

function reiniciarExcel(){
    $("table").tableExport({
        formats: ["xlsx"],
        bootstrap: true,
        ignoreCols: 3,
        fileName: "Almacen"
    });
}

// obtencion de los datos para el top ten
function obtenerConsumo() {
    $.ajax({
        url: '/consumos',
        type: 'POST',
        data: formularioConsumo.serialize(),
        success : function(data) {
            // Almacen
            eliminaFilas(); // elimino las filas
            agregarFilas(data);
            ajustarTabla()
            reiniciarExcel();
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
        obtenerConsumo();
    });
        // select de sucursal
    $("select[name=categoria]").change(function(){
        obtenerConsumo();
    });
});