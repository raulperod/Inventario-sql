var formularioAlmacen;
// funcion que agrega las nuevas filas a la tabla
function agregarFilas(productos){
    for(var i=0 ; productos[i] ; i++){
        var producto = productos[i],
            nombre = producto.nombreProducto,
            codigo = producto.codigo,
            cantidad = producto.cantidadAlmacen,
            minimo = producto.minimo;

        $('#dataTables-example tbody').append(getFila(nombre, codigo, cantidad, minimo));
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
    $("#tbodyid").empty();
};

function activarTabla(){
    $('#dataTables-example').DataTable({
        responsive: true
    });
}

function reiniciarTabla(){
    $('#dataTables-example').DataTable().ajax.reload();
}

function reiniciarExcel(){
    $('.xlsx').remove();
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
            eliminaFilas(); // elimino las filas
            // si no he inicializado productos
            agregarFilas(data);
            reiniciarExcel();
            activarTabla();
        }
    });
}

function reiniciarAlmacen(){
    $.ajax({
        url: '/almacen',
        type: 'POST',
        data: formularioAlmacen.serialize(),
        success : function(data) {
            // Almacen
            eliminaFilas(); // elimino las filas
            // si no he inicializado productos
            agregarFilas(data);
            reiniciarExcel();
            reiniciarTabla();
        }
    });
}

// funcion principal
$(function(){ 
    // obtengo el formulario del almacen
    formularioAlmacen = $('#formalmacen');
    obtenerAlmacen();
    // fechas para el top ten
    $("select[name=plaza]").change(function(){
        reiniciarAlmacen();
    });
        // select de sucursal
    $("select[name=categoria]").change(function(){
        reiniciarAlmacen();
    });
});
    