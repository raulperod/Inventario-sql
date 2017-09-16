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

        getFilas(nombre, codigo, cantidad, idAlmacen, esBasico);
    }
    $('#dataTables-example').DataTable().draw();
}

function getFilas(nombre, codigo, cantidad, idAlmacen, esBasico){
    var table = $('#dataTables-example').DataTable();
    var string1,string2,string3,string4;
    // llenar el string :(
    string1 = '<td>' + nombre + '</td>';
    string2 = '<td>' + codigo + '</td>';
    string3 = '<p name="' + idAlmacen + '">' + cantidad + '</p>';
    if(!esBasico){
        string4 = '<form id="' + idAlmacen + '" style="display:inline" action="/consumos/' + idAlmacen + '?_method=PUT" method="POST" onsubmit="return false">';
        string4 += '<input id="' + codigo + '" type="number" name="cantidad" min="0" max="10000" value="0" required="required" class="form-control"/>';
        string4 += '<b>&nbsp &nbsp &nbsp</b>';
        string4 += '<button type="submit/image" alt="text" name="button1" onclick="return false" class="btn btn-danger btn-circle ' + idAlmacen + ' ' + codigo + '">';
        string4 += '<i title="Pasar a bajas" class="fa fa-times"></i></button></form>';
    }else{
        string4 = '<fieldset disabled="">';
        string4 += '<form style="display:inline" action="/consumos/' + idAlmacen + '?_method=PUT" method="POST" onsubmit="return false">';
        string4 += '<input id="disabledInput" type="number" name="cantidad" min="0" max="10000" value="0" required="required" disabled="disabled" class="form-control"/><b>&nbsp &nbsp &nbsp</b>';
        string4 += '<button type="submit/image" alt="text" class="btn btn-danger btn-circle"><i title="Pasar a bajas" class="fa fa-times"></i></button>';
        string4 += '</form></fieldset>';
    }
    table.row.add([
        string2,
        string1,
        string3,
        string4
    ]);
}

// elimina todas las filas de la tabla, menos la principal
function eliminaFilas(){
    //$("#tbodyid").empty();    
    $('#dataTables-example').DataTable().clear().draw();
};

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
                        var p = $("p[name="+id+"]")
                        input.val("0") // coloco en 0 al input
                        p.text(cantidad) // pongo la nueva cantidad
                    }
                },
                error: function(data){
                    alert("Error")
                }
            })
        }
    })
}

function desactivarBotones(){
    $("button[name=button1]").unbind('click');
}

// obtencion de los datos para el top ten
function obtenerConsumo() {
    $.ajax({
        url: '/consumos',
        type: 'POST',
        data: formularioConsumo.serialize(),
        success : function(data) {
            // Almacen
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

    // select de sucursal
    $("select[name=categoria]").change(function(){
        reiniciarConsumo();
    });

    $('#dataTables-example').on( 'draw.dt', function () {
        desactivarBotones()
        activarBotones();
    });
});
