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
        res.render("login")
    }else{  // si ya esta logeado, entonces se redirecciona al almacen
        res.redirect("/almacen")
    }
}

// para logearte
function loginPost(req, res) {
    // obtengo el username y password
    let username = req.body.username.toLowerCase(),
        password = req.body.password,
        seleccion = ['username','password','permisos','status','idSucursal']
    // se busca al usuario con el username
    UserModel.getUserByUsername( username, seleccion , resultado => { // si se obtubo al usuario
        // obtengo el usuario
        let usuario =  resultado[0],
            promesa = new Promise( (resolve, reject) => {
                // comprueba si se pudo obtener el usuario
                return (usuario) ? resolve(true) : reject({ msg: 'Error username incorrecto', tipo: 1 })
            })
        // ejecuto la promesa
        promesa
                .then( () => {
                    return new Promise((resolve, reject) => {
                        // comprueba si el usuario esta activo
                        return (usuario.status) ? resolve(true) : reject({ msg: 'Error usuario inactivo', tipo: 2 })
                    })
                })
                .then( () => {
                    return new Promise((resolve, reject) => {
                        // comprueba si la contraseña es correcta
                        return (usuario.password === password) ? resolve(true) : reject({ msg: 'Error contraseña incorrecta', tipo: 3 })
                    })
                })
                .then( () => {
                    // inicia al usuario
                    req.session.user = usuario
                    res.redirect('/almacen')
                })
                .catch( error => {
                    // si hubo erro lo manda
                    res.json({error})
                })

    }, error => { // si ocurrio un error con la base de datos
        // se manda una alerta como respuesta
        res.json({ msg: `Error con la base de datos : ${error}` , tipo: 0 })
    })
}

function logout(req, res) {
    // cierra la sesion del usuario
    req.session = null
    // te redirecciona al inicio
    res.redirect("/login")
}

function error404(req, res) {
    res.redirect('/almacen')
}

module.exports = {
    index,
    loginGet,
    loginPost,
    logout,
    error404
}