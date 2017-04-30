'use strict'

$(document).ready(() => {
    $("button[name=button1]").click( () => {
        if( confirm('¿Esta seguro que desea agregar esos productos?') ){
        // obtengo el id del almacen
        let id = $(this).attr("class").split(" ")[3]
        // obtengo el codigo del producto
        let codigo = $(this).attr("class").split(" ")[4]
        // obtengo la cantidad minima del producto
        let minimo = parseInt( $(this).attr("class").split(" ")[5] )
        // obtengo el formulario
        let formulario = $("#"+id)
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
                        let input = $("#"+codigo)
                        let td = $("td[name="+id+"]")
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
      let id = $(this).attr("class").split(" ")[3]
      // obtengo el codigo del producto
      let codigo = $(this).attr("class").split(" ")[4]
      // obtengo la cantidad minima del producto
      let minimo = parseInt( $(this).attr("class").split(" ")[5] )
      // obtengo el formulario
      let formulario = $("#"+id)
      // edito el action el formulario
      formulario.attr("action","/almacen/"+id+"/sub?_method=PUT")

      $.ajax({
        type: formulario.attr("method"),
        url:  formulario.attr("action"),
        data: formulario.serialize(),
        success: function(cantidad){
          if(cantidad !== ""){
            let input = $("#"+codigo)
            let td = $("td[name="+id+"]")
            input.val("0") // coloco en 0 al input
            td.text(cantidad) // pongo la nueva cantidad
            if( parseInt(cantidad) < minimo ){
              td.css("color", "#FF0040")
            }
          }
        },
        error: function(data){
          alert("Error")
        }
      })
    }
  })
})
