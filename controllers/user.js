/**
 * Created by Raul Perez on 11/04/2017.
 */
'use strict'

const UserModel = require('../models/user')

function usersGet(req, res) {
    const usuario = req.session.user
    // verifica que tipo de usuario es
    if( usuario.permisos === 2 ){  // si es admin general
        UserModel.getUsers( resultado => { // si se pudieron obtener los usuarios
            const locals = {
                usuarios: resultado,        // usuarios obtenidos
                usuario : req.session.user  // usuario logeado
            }
            res.render('./users/manager', locals )
        }, error => { // si hubo un error
            console.log(`Error al obtener los usuarios: ${error}`)
            res.redirect('/almacen')
        })
    } else { // si es admin de sucursal
        const idSucursal = req.session.user.idSucursal // obtienes el id de la sucursal del usuario
        UserModel.getUsersBySucursal(idSucursal ,resultado => { // si se pudieron obtener los usuarios
            const locals = {
                usuarios: resultado,        // usuarios obtenidos
                usuario : req.session.user  // usuario logeado
            }
            res.render('./users/manager', locals )
        }, error => { // si hubo un error
            console.log(`Error al obtener los usuarios: ${error}`)
            res.redirect('/almacen')
        })
    }
}

function usersNewGet(req, res) {

}

function usersNewPost(req, res) {

}

// para logearte
function loginPost(req, res) {
    // obtengo el username y password
    const username = req.body.username,
          password = req.body.password
    // se busca al usuario con el username
    UserModel.getUserByUsername( username , resultado => { // si se obtubo al usuario
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
    }, error => { // si ocurrio un error
        console.log(`Error al obtener el usuario : ${error}`)
        // como no existe ese username
        // se manda una alerta como respuesta
        res.send('0')
    })
}

module.exports = {
    usersGet,
    usersNewGet,
    usersNewPost,
    loginPost
}