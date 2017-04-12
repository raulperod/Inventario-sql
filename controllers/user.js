/**
 * Created by Raul Perez on 11/04/2017.
 */
'use strict'

const UserModel = require('../models/user')

// para registrarse
function signUp(req, res) {

}
// para logearte
function signIn(req, res) {
    // obtengo el username y password
    const username = req.body.username,
          password = req.body.password
    // se busca al usuario con el username
    UserModel.getUserByUsername( username , (resultado) => { // si se obtubo al usuario
        // obtengo el usuario
        const usuario =  resultado[0]
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
    }, () => { // si ocurrio un error
        console.log('Error al obtener el usuario')
        // como no existe ese username
        // se manda una alerta como respuesta
        res.send('0')
    })
}

module.exports = {
    signUp,
    signIn
}