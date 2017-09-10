var formularioProducts;
// funcion que agrega las nuevas filas a la tabla
function agregarFilas(productos){
    for(var i=0 ; productos[i] ; i++){
        var producto = productos[i],
            nombre = producto.nombre,
            descripcion = producto.descripcion,
            codigo = producto.codigo,
            minimo = producto.minimo,
            basico = producto.esBasico
            idProducto = producto.idProducto;

        $('#dataTables-example tr:last')
            .after(getFila(nombre, descripcion, codigo, minimo, basico, idProducto));
    }
}

function getFila(nombre, descripcion, codigo, minimo, basico, idProducto){
    var string;
    // llenar el string :(
    string = '<tr class="odd gradeX"><td>'+nombre+'</td><td>'+descripcion+'</td><td>'+codigo+'</td><td>'+minimo+'</td>';
    if(basico){ 
        string += '<td>Si</td>'; 
    } else { 
        string += '<td>No</td>'; 
    }
    string += '<td><a href="/products/'+idProducto+'" class="btn btn btn-primary btn-circle"><i title="Editar" class="fa fa-list"></i></a><b>&nbsp &nbsp &nbsp</b>'; 
    string += '<form id="eliminar" style="display:inline" action="/products/'+idProducto+'?_method=DELETE" method="POST" onsubmit="return confirm("¿Continuar con la eliminación?")">';
    string += '<button type="submit/image" alt="text" value="" class="btn btn-danger btn-circle"><i title="Eliminar" class="fa fa-times"></i></button>';
    string += '</form></td></tr>';
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

// obtencion de los datos para el top ten
function obtenerProductos() {
    $.ajax({
        url: '/products',
        type: 'POST',
        data: formularioProducts.serialize(),
        success : function(data) {
            // Almacen
            console.log(data)
            eliminaFilas(); // elimino las filas
            agregarFilas(data);
            ajustarTabla()
        }
    });
}

// funcion principal
$(function(){ 
    // obtengo el formulario del almacen
    formularioProducts = $('#formproducto');
    obtenerProductos();

    // fechas para el top ten
    $("selects[name=categoria]").change(function(){
        obtenerProductos();
    });
   
});