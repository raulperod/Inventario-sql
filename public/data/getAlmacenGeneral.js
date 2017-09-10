var formularioAlmacen;
// funcion que agrega las nuevas filas a la tabla
function agregarFilas(productos){
    for(var i=0 ; productos[i] ; i++){
        var producto = productos[i],
            nombre = producto.nombreProducto,
            codigo = producto.codigo,
            cantidad = producto.cantidadAlmacen,
            minimo = producto.minimo;

        $('#dataTables-example tr:last')
            .after(getFila(nombre, codigo, cantidad, minimo));
    }
}

function getFila(nombre, codigo, cantidad, minimo){
    var string;
    // llenar el string :(
    string = '<tr class="odd gradeX"><td>' + nombre + '</td><td>' + codigo + '</td>';
    if(cantidad > minimo){
        string += '<td>' + cantidad + '</td>'
    }else{
        string += '<td style="color:red" title="Pocos productos">' + cantidad + '</td></tr>'
    }
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
        fileName: "Almacen"
    });
}

// obtencion de los datos para el top ten
function obtenerAlmacen() {
    $.ajax({
        url: '/almacen',
        type: 'POST',
        data: formularioAlmacen.serialize(),
        success : function(data) {
            // Almacen
            console.log(data);
            eliminaFilas(); // elimino las filas
            // si no he inicializado productos
            agregarFilas(data);
            // ajusto la tabla
            ajustarTabla()
            reiniciarExcel()
        }
    });
}

// funcion principal
$(function(){ 
    // obtengo el formulario del almacen
    formularioAlmacen = $('#formalmacen');
    obtenerAlmacen();

    // fechas para el top ten
    $("input[name=plaza]").change(function(){
        obtenerAlmacen();
    });
        // select de sucursal
    $("select[name=categoria]").change(function(){
        obtenerAlmacen();
    });
});
    