var datosFormulario; //lo que se va a enviar
var name;
var desc;
$(function(){

	$("input:submit").click(function() {
		datosFormulario= $('#formNew');
		name = document.getElementById('name').value;
		desc = document.getElementById('desc').value;
		if(name== "" || desc == ""){
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
		 	+"data-dismiss='alert' aria-hidden='true'>&times;</button>La categoria ya existe!.</div>");
	        break;
	    case 2:
	        $("#aviso").html("<div class='alert alert-danger alert-dismissable'><button type='button' class='close'"
		 	+"data-dismiss='alert' aria-hidden='true'>&times;</button>Ambos campos son necesarios!</div>");
	        break;	
	}
}
function obtenerMensaje() {
	$.ajax({
        url: '/categories/new',
        type: 'POST',
        data: datosFormulario.serialize(),
        success : function(data) {
        	var arreglo=Object.values(data);
        	if(arreglo[1]==3) window.location.replace("/categories");
            mostrarAviso(arreglo[1]);
        }
    });
}