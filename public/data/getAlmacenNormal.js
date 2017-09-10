var formularioAlmacen;
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

        $('#dataTables-example tr:last')
            .after(getFila(nombre, codigo, cantidad, minimo, idAlmacen, esBasico));
    }
}

function getFila(nombre, codigo, cantidad, minimo, idAlmacen, esBasico){
    var string;
    // llenar el string :(
    string = '<tr class="odd gradeX">';
    string += '<td>' + nombre + '</td>';
    string += '<td>' + codigo + '</td>';
    if(cantidad > minimo){
        string += '<td name="' + idAlmacen + '">' + cantidad + '</td>';
    }else{
        string += '<td name="' + idAlmacen + '" style="color:red" title="Pocos productos">' + cantidad + '</td>';
    }
    string += '<td><form id="' + idAlmacen + '" style="display:inline" action="/almacen/' + idAlmacen + '?_method=PUT" method="POST" onsubmit="return false">';
    string += '<input id="' + codigo + '" type="number" name="cantidad" min="0" max="10000" value="0" class="form-control" required />';
    string += '<b>&nbsp &nbsp &nbsp</b>';
    string += '<button type="submit/image" alt="text" name="button1" onclick="return false" class="btn btn-primary btn-circle ' + idAlmacen + ' ' + codigo + ' ' + minimo + '"><i title="Agregar" class="fa fa-plus"></i></button></form>';
    if(!esBasico){
        string += '<b>&nbsp &nbsp &nbsp</b><button type="submit/image" alt="text" name="button2" onclick="return false" class="btn btn-danger btn-circle ' + idAlmacen + ' ' + codigo + ' ' + minimo + '"><i title="Pasar a consumo" class="fa fa-minus"></i></button>';
    }else{
        string += '<b>&nbsp &nbsp &nbsp<button type="submit/image" alt="text" name="button2" disabled="disabled" class="btn btn-danger btn-circle"><i title="Pasar a consumo" class="fa fa-minus"></i></button></b>';
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
            // ajusto la tabla
            ajustarTabla()
            reiniciarExcel();
            activarBotones();
        }
    });
}

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
                            var td = $("td[name="+id+"]")
                            input.val("0") // coloco en 0 al input
                            td.text(cantidad) // pongo la nueva cantidad
                            if( parseInt(cantidad) > minimo ) td.css("color", "#000000")
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
                        var td = $("td[name="+id+"]")
                        input.val("0") // coloco en 0 al input
                        td.text(cantidad) // pongo la nueva cantidad
                        if( parseInt(cantidad) < minimo ) td.css("color", "#FF0040")
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
    formularioAlmacen = $('#formalmacen');
    obtenerAlmacen();

    // fechas para el top ten
    $("select[name=plaza]").change(function(){
        obtenerAlmacen();
    });
        // select de sucursal
    $("select[name=categoria]").change(function(){
        obtenerAlmacen();
    });
});

    