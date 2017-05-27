var datosFormulario; //lo que se va a enviar
var plaza;
var ciudad;
$(function(){

	$("input:submit").click(function() {
		datosFormulario= $('#formUpdate');
		plaza = document.getElementById('plaza').value;
		ciudad = document.getElementById('city').value;
		if(ciudad== "" || plaza == ""){
			mostrarAviso(2);
			return false;
		}
		obtenerMensaje();
		return false;
	});

});
function mostrarAviso(error){
	switch(error) {
	    case 1:
	        $("#aviso").html("<div class='alert alert-danger alert-dismissable'><button type='button' class='close'"
		 	+"data-dismiss='alert' aria-hidden='true'>&times;</button>La plaza ya existe!.</div>");
	        break;
	    case 2:
	        $("#aviso").html("<div class='alert alert-danger alert-dismissable'><button type='button' class='close'"
		 	+"data-dismiss='alert' aria-hidden='true'>&times;</button>Ambos campos son necesarios!</div>");
	        break;	
	}
}
function obtenerMensaje() {
	var action=document.getElementById('formUpdate').action;
	$.ajax({
        url: action,
        type: 'POST',
        data: datosFormulario.serialize(),
        success : function(data) {
        	var arreglo=Object.values(data);
        	if(arreglo[1]==3) window.location.replace("/sucursales");
            mostrarAviso(arreglo[1]);
        }
    });
}