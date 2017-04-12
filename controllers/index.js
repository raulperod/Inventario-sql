/**
 * Created by Raul Perez on 11/04/2017.
 */
'use strict'

const UserModel = require('../models/user')

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

// para logearte
function loginPost(req, res) {
    // obtengo el username y password
    let username = req.body.username,
        password = req.body.password,
        seleccion = ['username','password','permisos','status','idSucursal']
    // se busca al usuario con el username
    UserModel.getUserByUsername( username, seleccion , resultado => { // si se obtubo al usuario
        // obtengo el usuario
        let usuario =  resultado[0]
        // verifica si el usuario esta activo
        if( usuario.status ) {
            // verifica si la contraseña coincide
            if (usuario.password === password) {
                req.session.user = usuario
                res.redirect('/almacen')
            } else { // como no coincidio, se manda una alerta
                res.send('1')
            }
        }else{ // si no esta activo se manda una alerta
            res.send('2')
        }
    }, error => { // si ocurrio un error
        console.log(`Error al obtener el usuario : ${error}`)
        // como no existe ese username
        // se manda una alerta como respuesta
        res.send('0')
    })
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
    loginPost,
    logout,
    error404
}