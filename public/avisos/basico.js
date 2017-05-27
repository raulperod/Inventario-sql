var datosFormulario; //lo que se va a enviar
$(function(){

	$("#boton1").click(function() {
		datosFormulario= $('#form1');
		var action=document.getElementById('form1').action;
		obtenerMensaje(action);
		console.log("Boton1");
		return false;
	});
	$("#boton2").click(function() {
		datosFormulario= $('#form2');
		var action=document.getElementById('form2').action;
		obtenerMensaje(action);
		console.log("Boton2");
		return false;
	});

});
function mostrarAviso(error){
	switch(error) {
	    case 11:
	        $("#aviso1").html("<div class='alert alert-danger alert-dismissable'><button type='button' class='close'"
		 	+"data-dismiss='alert' aria-hidden='true'>&times;</button>El produto esta en uso!.</div>");
	        break;
	    case 12:
	        $("#aviso1").html("<div class='alert alert-danger alert-dismissable'><button type='button' class='close'"
		 	+"data-dismiss='alert' aria-hidden='true'>&times;</button>No hay productos en el almacen!.</div>");
	        break;
	    case 13:
	        $("#aviso1").html("<div class='alert alert-success alert-dismissable'><button type='button' class='close'"
		 	+"data-dismiss='alert' aria-hidden='true'>&times;</button>Producto asignado!.</div>");
	        break;
	    case 21:
	        $("#aviso2").html("<div class='alert alert-danger alert-dismissable'><button type='button' class='close'"
		 	+"data-dismiss='alert' aria-hidden='true'>&times;</button>El producto no esta asignado!.</div>");
	        break;
	    case 23:
	        $("#aviso2").html("<div class='alert alert-success alert-dismissable'><button type='button' class='close'"
		 	+"data-dismiss='alert' aria-hidden='true'>&times;</button>Producto dado de baja!.</div>");
	        break;
	}
}
function obtenerMensaje(action) {
	$.ajax({
        url: action,
        type: 'POST',
        data: datosFormulario.serialize(),
        success : function(data) {
        	var arreglo=Object.values(data);
            mostrarAviso(arreglo[1]);
        }
    });
}