$(document).ready(function () {
  $("button[name=button1]").click(function(){
    if( confirm('¿Esta seguro que desea realizar la baja de esos productos?') ){
      // obtengo el id del almacen
      var id = $(this).attr("class").split(" ")[3];
      // obtengo el codigo del producto
      var codigo = $(this).attr("class").split(" ")[4];
      // obtengo el formulario
      var formulario = $("#"+id);

      $.ajax({
        type: formulario.attr("method"),
        url:  formulario.attr("action"),
        data: formulario.serialize(),
        success: function(cantidad){
          if(cantidad != ""){
            var input = $("#"+codigo);
            var td = $("td[name="+id+"]");
            input.val("0"); // coloco en 0 al input
            td.text(cantidad); // pongo la nueva cantidad
          }
        },
        error: function(data){
          alert("Error");
        }
      });
    }
  });
});
