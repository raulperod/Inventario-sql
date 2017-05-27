var datosFormulario; //lo que se va a enviar
var user,name,last,pass,pass2;
$(function(){

	$("input:submit").click(function() {
		datosFormulario= $('#formNew');
		user = document.getElementById('user').value;
		name = document.getElementById('name').value;
		last = document.getElementById('last').value;
		pass = document.getElementById('pass').value;
		pass2 = document.getElementById('pass2').value;
		if(user== "" || name=="" || last=="" || pass=="" || pass2==""){
			mostrarAviso(2);
			return false;
		}
		if(pass!=pass2){
			mostrarAviso(10);
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
		 	+"data-dismiss='alert' aria-hidden='true'>&times;</button>Usuario repetido!.</div>");
	        break;
	    case 2:
	        $("#aviso").html("<div class='alert alert-danger alert-dismissable'><button type='button' class='close'"
		 	+"data-dismiss='alert' aria-hidden='true'>&times;</button>Todos los campos son necesarios!</div>");
	        break;
	    case 10:
	        $("#aviso").html("<div class='alert alert-danger alert-dismissable'><button type='button' class='close'"
		 	+"data-dismiss='alert' aria-hidden='true'>&times;</button>Las contraseñas deben coincidir!</div>");
	        break;	
	}
}
function obtenerMensaje() {
	$.ajax({
        url: '/users/new',
        type: 'POST',
        data: datosFormulario.serialize(),
        success : function(data) {
        	var arreglo=Object.values(data);
        	if(arreglo[1]==3) window.location.replace("/users");
            mostrarAviso(arreglo[1]);
        }
    });
}