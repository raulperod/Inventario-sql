/**
 * Created by Raul Perez on 11/04/2017.
 */
'use strict'

const UserModel = require('../models/user'),
      SucursalModel = require('../models/sucursal')

function usersGet(req, res) {
    let usuario = req.session.user
    // verifica que tipo de usuario es
    if( usuario.permisos === 2 ){  // si es admin general
        let seleccion = ['*'] // pongo la seleccion que hara
        UserModel.getUsers( seleccion ,usuarios => { // si se pudieron obtener los usuarios
            res.render('./users/manager', { usuarios, usuario } )
        }, error => { // si hubo un error
            console.log(`Error al obtener los usuarios: ${error}`)
            res.redirect('/almacen')
        })
    } else { // si es admin de sucursal
        let idSucursal = req.session.user.idSucursal, // obtienes el id de la sucursal del usuario
              seleccion = ['username','password','nombre','apellido','permisos','status'] // pongo la seleccion que hara
        UserModel.getUsersBySucursal(idSucursal, seleccion ,usuarios => { // si se pudieron obtener los usuarios
            res.render('./users/manager', { usuarios, usuario } )
        }, error => { // si hubo un error
            console.log(`Error al obtener los usuarios: ${error}`)
            res.redirect('/almacen')
        })
    }
}

function usersNewGet(req, res) {
    let usuario = req.session.user
    if( usuario.permisos === 2 ){ // si es admin general
        let seleccion = ['plaza']
        SucursalModel.getSucursales(seleccion, sucursales => { // si se pudo obtener las sucursales
            res.render('./users/new', { sucursales, usuario })
        }, error => { // si ocurrio un error
            console.log(`Error no se pudieron obtener las sucursales: ${error}`)
        })
    } else { // si es admin general
        res.render('./users/new',{ usuario })
    }
}

function usersNewPost(req, res) {
    const usuario = req.session.user
    if( usuario.permisos === 2 ){ // si es administrador general
        // declaro constantes necesarias
        let plaza = req.body.plaza,
            seleccion = ['idSucursal']
        // busco la sucursal del nuevo usuario
        SucursalModel.getSucursalByPlaza(plaza, seleccion, sucursal => {
            // genero el nuevo usuario
            let nuevoUsuario = {
                username: req.body.username,
                nombre: req.body.name,
                apellido: req.body.last_name,
                password: req.body.password,
                sucursal: sucursal.idSucursal,
                permisos: 1,
                status: true
            }
            // agrego al nuevo usuario
            UserModel.createUser(nuevoUsuario, () => {  // si se agrego correctamente
                res.redirect('/almacen', { usuario })
            }, error => { // si hubo error
                console.log(`Error al agregar en nuevo usuario: ${error}`)
                // mando una alerta que el username esta repetido
                res.send('0')
            })
        }, error => {
            console.log(`Error al obtener la sucural: ${error}`)
            res.redirect('/almacen')
        })
    } else { // si es administrador de sucursales
        // genero el nuevo usuario
        let nuevoUsuario = {
            username: req.body.username,
            nombre: req.body.name,
            apellido: req.body.last_name,
            password: req.body.password,
            sucursal: usuario.idSucursal,
            permisos: 0,
            status: true
        }
        // agrego al nuevo usuario
        UserModel.createUser(nuevoUsuario, () => {  // si se agrego correctamente
            res.redirect('/almacen', { usuario })
        }, error => { // si hubo error
            console.log(`Error al agregar en nuevo usuario: ${error}`)
            // mando una alerta que el username esta repetido
            res.send('0')
        })
    }
}

function usersIdUsuarioGet(req, res) {
    // declarar variables necesarias
    let usuario = req.session.user, // obtengo al usuario logeado
        idUsuario = req.params.idUsuario // obtengo el id del usuario a editar
    if( usuario.permisos === 2 ){ //  si es administrador general
        // defino la seleccion
        let seleccionS = ['plaza'] // se tomara la plaza
        // busca las sucursales
        SucursalModel.getSucursales(seleccionS, sucursales => { // si no hubo error
            // defino la seleccion
            let seleccionU = ['*']  // se tomara todos los campos
            // busca al usuario a editar
            UserModel.getUserById(idUsuario, seleccionU, usuarioUpdate => { // si no hubo error
                res.render('./users/update', { sucursales, usuarioUpdate, usuario })
            }, error => { // si hubo error
                console.log(`Error al obtener el usuario: ${error}`)
                res.redirect('/almacen')
            })
        }, error => { // si hubo error
            console.log(`Error al obtener la sucursal: ${error}`)
            res.redirect('/almacen')
        })
    } else { // si es administrador de sucursal
        // defino la seleccion
        let seleccion = ['*'] // se tomara todos los campos
        // obtengo al usuario a editar
        UserModel.getUserById(idUsuario, seleccion, usuarioUpdate => { // si no hubo error
            res.render('./users/update', { usuarioUpdate, usuario })
        }, error => { // si hubo error
            console.log(`Error al obtener el usuario: ${error}`)
            res.redirect('/almacen')
        })
    }
}

function usersIdUsuarioPut(req ,res) {
    let usuario = req.session.user // obtenemos el usuario logeado
    if( usuario.permisos === 2 ){ // si es administrado general

    } else { // si es administrador de sucursal

    }
}

module.exports = {
    usersGet,
    usersNewGet,
    usersNewPost,
    usersIdUsuarioGet,
    usersIdUsuarioPut
}