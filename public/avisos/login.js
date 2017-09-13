var datosFormulario, //lo que se va a enviar
    user,
    pass;
$(function(){

    user = document.getElementById('user');
    pass = document.getElementById('pass');
    datosFormulario= $('#formLogin');

    $("input:submit").click(function() {
        if(user.value == "" || pass.value == ""){
            mostrarAviso(5);
            return false;
        }else if(user.value.length > 20){
            mostrarAviso(1);
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
            +"data-dismiss='alert' aria-hidden='true'>&times;</button>Usuario no existe!.</div>");
        break;
    case 2:
        $("#aviso").html("<div class='alert alert-danger alert-dismissable'><button type='button' class='close'"
            +"data-dismiss='alert' aria-hidden='true'>&times;</button>Usuario inactivo.</div>");
        break;
    case 3:
        $("#aviso").html("<div class='alert alert-danger alert-dismissable'><button type='button' class='close'"
            +"data-dismiss='alert' aria-hidden='true'>&times;</button>Contraseña incorrecta!.</div>");
        break;
    case 5:
        $("#aviso").html("<div class='alert alert-danger alert-dismissable'><button type='button' class='close'"
            +"data-dismiss='alert' aria-hidden='true'>&times;</button>Ambos campos son requeridos!.</div>");
        break;
    default:
        break;
}
}
function obtenerMensaje() {
$.ajax({
    url: '/login',
    type: 'POST',
    data: datosFormulario.serialize(),
    success : function(data) {
        if(data.tipo==4){
            window.location.replace("/almacen");
        }
        mostrarAviso(data.tipo);
    }
});
}