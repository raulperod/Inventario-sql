/**
 * Created by Raul Perez on 11/04/2017.
 */
'use strict'

function index(req, res) {
    // verifica si existe un usuario logeado
    if(req.session.user){
        res.redirect("/almacen");  // lo redirecciona a almacen
    }else{
        // si no esta logeado lo manda al login
        res.redirect("/login");
    }
}

function loginGet(req, res) {
    // si no esta logeado entra al login
    if(!req.session.user){
        // manda falsa las alertas y renderisa login
        res.render("login");
    }else{  // si ya esta logeado, entonces se redirecciona al almacen
        res.redirect("/almacen");
    }
}

function logout(req, res) {
    // cierra la sesion del usuario
    req.session = null;
    // te redirecciona al inicio
    res.redirect("/login");
}

function error404(req, res) {
    res.render('error')
}

module.exports = {
    index,
    loginGet,
    logout,
    error404
}