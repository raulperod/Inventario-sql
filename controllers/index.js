/**
 * Created by Raul Perez on 11/04/2017.
 */
'use strict'

const UserModel = require('../models/usuario'),
      Utilidad = require('../ayuda/utilidad')

function index(req, res) {
    // verifica si existe un usuario logeado
    (req.session.user) ? res.redirect("/almacen") : res.redirect("/login")
}

function loginGet(req, res) {
    // si no esta logeado entra al login
    (req.session.user) ? res.redirect("/almacen") : res.render('login')
}

// para logearte
function loginPost(req, res){
    // declaro variables necesarias
    let username = req.body.username.toLowerCase(),
        password = req.body.password

    UserModel.getUserByUsername(username, (error, usuario) =>{
        // declaro la promesa
        let promesa = Utilidad.returnPromise(!error, true, { msg: `Error con la base de datos : ${error}`, tipo: 0 })
        // ejecuto la promesa
        promesa
                .then(() => {
                    // comprueba si se pudo obtener el usuario
                    return Utilidad.returnPromise(usuario, true, { msg: 'Error username incorrecto', tipo: 1 })
                })
                .then(() => {
                    // comprueba si el usuario esta activo
                    return Utilidad.returnPromise(usuario.status, true, { msg: 'Error usuario inactivo', tipo: 2 })
                })
                .then(() => {
                    // comprueba si la contraseña es correcta
                    return Utilidad.returnPromise(usuario.password === password, true, { msg: 'Error contraseña incorrecta', tipo: 3 })
                })
                .then(() => {
                    // inicia al usuario y sus variables a utlizar
                    req.session.user = usuario
                    // envia para saber que es correcto
                    res.json ({msg:'Datos correctos', tipo: 4})
                    //res.redirect('/almacen')
                })
                .catch( error => {
                    // si hubo erro lo manda
                    Utilidad.printError(res, error)
                })
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
