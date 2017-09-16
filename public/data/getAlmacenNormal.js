var formularioAlmacen,
    table;
// funcion que agrega las nuevas filas a la tabla
function agregarFilas(productos){
    for(var i=0 ; productos[i] ; i++){
        var producto = productos[i],
            nombre = producto.nombreProducto,
            codigo = producto.codigo,
            cantidad = producto.cantidadAlmacen,
            minimo = producto.minimo,
            idAlmacen = producto.idAlmacen,
            esBasico = producto.esBasico;

        getFilas(nombre, codigo, cantidad, minimo, idAlmacen, esBasico)
    }
    $('#dataTables-example').DataTable().draw();
}

function getFilas(nombre, codigo, cantidad, minimo, idAlmacen, esBasico){
    var table = $('#dataTables-example').DataTable();
    var string1,string2,string3,string4;
    // llenar el string :(
    string1 = '<td>' + nombre + '</td>';
    string2 = '<td>' + codigo + '</td>';
    if(cantidad > minimo){
        string3 = '<p name="' + idAlmacen + '">' + cantidad + '</p>';
    }else{
        string3 = '<p name="' + idAlmacen + '" style="color:red" title="Pocos productos">' + cantidad + '</p>';
    }
    string4 = '<form id="' + idAlmacen + '" style="display:inline" action="/almacen/' + idAlmacen + '?_method=PUT" method="POST" onsubmit="return false">';
    string4 += '<input id="' + codigo + '" type="number" name="cantidad" min="0" max="10000" value="0" class="form-control" required />';
    string4 += '<b>&nbsp &nbsp &nbsp</b>';
    string4 += '<button type="submit/image" alt="text" name="button1" onclick="return false" class="btn btn-primary btn-circle ' + idAlmacen + ' ' + codigo + ' ' + minimo + '"><i title="Agregar" class="fa fa-plus"></i></button></form>';
    if(!esBasico){
        string4 += '<b>&nbsp &nbsp &nbsp</b><button type="submit/image" alt="text" name="button2" onclick="return false" class="btn btn-danger btn-circle ' + idAlmacen + ' ' + codigo + ' ' + minimo + '"><i title="Pasar a consumo" class="fa fa-minus"></i></button>';
    }else{
        string4 += '<b>&nbsp &nbsp &nbsp</b><button type="submit/image" alt="text" name="button2" disabled="disabled" class="btn btn-danger btn-circle"><i title="Pasar a consumo" class="fa fa-minus"></i></button>';
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
        if( confirm('¿Esta seguro que desea agregar esos productos?') ){
            // obtengo el id del almacen
            var id = $(this).attr("class").split(" ")[3]
            // obtengo el codigo del producto
            var codigo = $(this).attr("class").split(" ")[4]
            // obtengo la cantidad minima del producto
            var minimo = parseInt( $(this).attr("class").split(" ")[5] )
            // obtengo el formulario
            var formulario = $("#"+id)
            // edito el action el formulario
            formulario.attr("action","/almacen/"+id+"/add?_method=PUT")
            // comentario
            $.ajax({
                type: formulario.attr("method"),
                url:  formulario.attr("action"),
                data: formulario.serialize(),
                success:
                    function(cantidad){
                        if(cantidad !== ""){
                            var input = $("#"+codigo)
                            var p = $("p[name="+id+"]")
                            input.val("0") // coloco en 0 al input
                            p.text(cantidad) // pongo la nueva cantidad
                            if( parseInt(cantidad) > minimo ) p.css("color", "#000000")
                        }
                    },
                  error: function(data){
                     alert("Error")
                  }
            })
        }
    })
    $("button[name=button2]").click(function(){
        if( confirm('¿Esta seguro que desea pasar a consumo esos productos?') ){
            // obtengo el id del almacen
            var id = $(this).attr("class").split(" ")[3]
            // obtengo el codigo del producto
            var codigo = $(this).attr("class").split(" ")[4]
            // obtengo la cantidad minima del producto
            var minimo = parseInt( $(this).attr("class").split(" ")[5] )
            // obtengo el formulario
            var formulario = $("#"+id)
            // edito el action el formulario
            formulario.attr("action","/almacen/"+id+"/sub?_method=PUT")

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
                        if( parseInt(cantidad) < minimo ) p.css("color", "#FF0040")
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
    $("button[name=button2]").unbind('click');
}

// obtencion de los datos para el top ten
function obtenerAlmacen() {
    $.ajax({
        url: '/almacen',
        type: 'POST',
        data: formularioAlmacen.serialize(),
        success : function(data) {
            // Almacen
            agregarFilas(data);
        }
    });
}

// obtencion de los datos para el top ten
function reiniciarAlmacen() {
    $.ajax({
        url: '/almacen',
        type: 'POST',
        data: formularioAlmacen.serialize(),
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
    formularioAlmacen = $('#formalmacen');
    obtenerAlmacen();

    // select de sucursal
    $("select[name=categoria]").change(function(){
        reiniciarAlmacen();
    });

    $('#dataTables-example').on( 'draw.dt', function () {
        desactivarBotones()
        activarBotones();
    });
    
});

    