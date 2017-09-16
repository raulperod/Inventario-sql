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

        getFilas(nombre, descripcion, codigo, minimo, basico, idProducto);
    }
    $('#dataTables-example').DataTable().draw();
}

function getFilas(nombre, descripcion, codigo, minimo, basico, idProducto){
    var table = $('#dataTables-example').DataTable();
    var string1,string2,string3,string4,string5;
    // llenar el string :(
    string1 = '<td>'+nombre+'</td>';
    string2 = '<td>'+descripcion+'</td>';
    string3 = '<td>'+codigo+'</td>';
    string4 = '<td>'+minimo+'</td>';
    if(basico){ 
        string5 = '<td>Si</td>'; 
    } else { 
        string5 = '<td>No</td>'; 
    }
    string6 = '<a href="/products/'+idProducto+'" class="btn btn btn-primary btn-circle"><i title="Editar" class="fa fa-list"></i></a><b>&nbsp &nbsp &nbsp</b>'; 
    string6 += '<form id="eliminar" style="display:inline" action="/products/'+idProducto+'?_method=DELETE" method="POST" onsubmit="return confirm(\'¿Continuar con la eliminación?\')">';
    string6 += '<button type="submit/image" alt="text" value="" class="btn btn-danger btn-circle"><i title="Eliminar" class="fa fa-times"></i></button></form>';
    table.row.add([
        string3,
        string1,
        string2,
        string4,
        string5,
        string6
    ]);
}

// elimina todas las filas de la tabla, menos la principal
function eliminaFilas(){
    //$("#tbodyid").empty();    
    $('#dataTables-example').DataTable().clear().draw();
};

// obtencion de los datos para el top ten
function obtenerProductos() {
    $.ajax({
        url: '/products',
        type: 'POST',
        data: formularioProducts.serialize(),
        success : function(data) {
            // Productos
            agregarFilas(data);
        }
    });
}

// obtencion de los datos para el top ten
function reiniciarProductos() {
    $.ajax({
        url: '/products',
        type: 'POST',
        data: formularioProducts.serialize(),
        success : function(data) {
            // Productos
            eliminaFilas();
            agregarFilas(data);
        }
    });
}

// funcion principal
$(function(){ 
    // obtengo el formulario del almacen
    formularioProducts = $('#formproducto');
    obtenerProductos();

    $("select[name=categoria]").change(function(){
        reiniciarProductos();
    });
   
});