var formularioConsumo;
// funcion que agrega las nuevas filas a la tabla
function agregarFilas(productos){
    for(var i=0 ; productos[i] ; i++){
        var producto = productos[i],
            nombre = producto.nombreProducto,
            codigo = producto.codigo,
            cantidad = producto.cantidadConsumo,
            minimo = producto.minimo,
            idAlmacen = producto.idAlmacen,
            esBasico = producto.esBasico;

        $('#dataTables-example tr:last')
            .after(getFila(nombre, codigo, cantidad, idAlmacen, esBasico));
    }
}

function getFila(nombre, codigo, cantidad, idAlmacen, esBasico){
    var string;
    // llenar el string :(
    string = '<tr class="odd gradeX"><td>' + nombre + '</td><td>' + codigo + '</td><td name="' + idAlmacen + '">' + cantidad + '</td><td>';
    if(!esBasico){
        string += '<form id="' + idAlmacen + '" style="display:inline" action="/consumos/' + idAlmacen + '?_method=PUT" method="POST" onsubmit="return false">';
        string += '<input id="' + codigo + '" type="number" name="cantidad" min="0" max="10000" value="0" required="required" class="form-control"/>';
        string += '<b>&nbsp &nbsp &nbsp</b>';
        string += '<button type="submit/image" alt="text" name="button1" onclick="return false" class="btn btn-danger btn-circle ' + idAlmacen + ' ' + codigo + '">';
        string += '<i title="Pasar a bajas" class="fa fa-times"></i></button></form>';
    }else{
        string += '<fieldset disabled="">';
        string += '<form style="display:inline" action="/consumos/' + idAlmacen + '?_method=PUT" method="POST" onsubmit="return false">';
        string += '<input id="disabledInput" type="number" name="cantidad" min="0" max="10000" value="0" required="required" disabled="disabled" class="form-control"/><b>&nbsp &nbsp &nbsp</b>';
        string += '<button type="submit/image" alt="text" class="btn btn-danger btn-circle"><i title="Pasar a bajas" class="fa fa-times"></i></button>';
        string += '</form></fieldset></td></tr>';
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
            // si no he inicializado productos
            agregarFilas(data);
            // ajusto la tabla
            ajustarTabla()
            reiniciarExcel();
            activarBotones();
        }
    });
}

function activarBotones(){
    $("button[name=button1]").click(function(){
        if( confirm('¿Esta seguro que desea realizar la baja de esos productos?') ){
            // obtengo el id del almacen
            var id = $(this).attr("class").split(" ")[3]
            // obtengo el codigo del producto
            var codigo = $(this).attr("class").split(" ")[4]
            // obtengo el formulario
            var formulario = $("#"+id)

            $.ajax({
                type: formulario.attr("method"),
                url:  formulario.attr("action"),
                data: formulario.serialize(),
                success: function(cantidad){
                    if(cantidad !== ""){
                        var input = $("#"+codigo)
                        var td = $("td[name="+id+"]")
                        input.val("0") // coloco en 0 al input
                        td.text(cantidad) // pongo la nueva cantidad
                    }
                },
                error: function(data){
                    alert("Error")
                }
            })
        }
    })
}

// funcion principal
$(function(){ 
    // obtengo el formulario del almacen
    formularioConsumo = $('#formconsumo');
    obtenerConsumo();

    // fechas para el top ten
    $("input[name=plaza]").change(function(){
        obtenerConsumo();
    });
        // select de sucursal
    $("select[name=categoria]").change(function(){
        obtenerConsumo();
    });
});
