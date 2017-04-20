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
        UserModel.getUsers( usuarios => { // si se pudieron obtener los usuarios
            res.render('./users/manager', { usuarios, usuario } )
        }, error => { // si hubo un error
            console.log(`Error al obtener los usuarios: ${error}`)
            res.redirect('/almacen')
        })
    } else { // si es admin de sucursal
        let idSucursal = req.session.user.idSucursal // obtienes el id de la sucursal del usuario
        UserModel.getUsersBySucursal(idSucursal, usuarios => { // si se pudieron obtener los usuarios
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
            res.redirect('/almacen')
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
                sucursal: sucursal[0].idSucursal,
                permisos: 1,
                status: true
            }
            // agrego al nuevo usuario
            UserModel.createUser(nuevoUsuario, () => {  // si se agrego correctamente
                res.redirect('/users')
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
            res.redirect('/users')
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
                res.render('./users/update', { sucursales, usuarioUpdate: usuarioUpdate[0], usuario })
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
        let seleccionU = ['idUsuario','username','password','nombre','apellido','permisos','status'] // se tomara todos los campos
        // obtengo al usuario a editar
        UserModel.getUserById(idUsuario, seleccionU, usuarioUpdate => { // si no hubo error
            res.render('./users/update', { usuarioUpdate: usuarioUpdate[0], usuario })
        }, error => { // si hubo error
            console.log(`Error al obtener el usuario: ${error}`)
            res.redirect('/almacen')
        })
    }
}

function usersIdUsuarioPut(req ,res) {
    let usuario = req.session.user, // obtenemos el usuario logeado
        idUsuario = req.params.idUsuario // obtengo el id del usuario
    if( usuario.permisos === 2 ){ // si es administrado general
        let selectionS = ['idSucursal'], // selecciono el id de la sucursal
            plaza = req.body.plaza  // obtengo la nueva sucursal del usuario
        // busco la nueva sucursal
        SucursalModel.getSucursalByPlaza(plaza, selectionS, sucursal => { // si no hubo error
            // creo al usuario con los cambios realizados
            let nuevoUsuario = {
                idUsuario,
                username: req.body.username,
                nombre: req.body.name,
                apellido: req.body.last_name,
                password: req.body.password,
                sucursal: sucursal[0].idSucursal,
                permisos:  req.body.permisos === "Administrador" ? 1 : 0,
                status: req.body.status === "Activo"
            }
            // guardo los cambios del usuario en la base de datos
            UserModel.updateUser(nuevoUsuario, () => { // si no hubo error al actualizar el usuario
                res.redirect('/users')
            }, error => { // si hubo error al actualizar
                // se repitio el username
                console.log(`Error al actualizar el usuario: ${error}`)
                // mando una alerta que se repitio el username
                res.send('0')
            })

        }, error => { // si hubo error al buscar la sucursal
            console.log(`Error al buscar la nueva sucursal: ${error}`)
            res.redirect('/error')
        })

    } else { // si es administrador de sucursal
        // creo al usuario con los cambios realizados
        let nuevoUsuario = {
            idUsuario,
            username: req.body.username,
            nombre: req.body.name,
            apellido: req.body.last_name,
            password: req.body.password,
            sucursal: usuario.idSucursal,
            permisos: 0,
            status: req.body.status === "Activo"
        }
        // guardo los cambios del usuario en la base de datos
        UserModel.updateUser(nuevoUsuario, () => { // si no hubo error al actualizar el usuario
            res.redirect('/users')
        }, error => { // si hubo error al actualizar
            // se repitio el username
            console.log(`Error al actualizar el usuario: ${error}`)
            // mando una alerta que se repitio el username
            res.send('0')
        })
    }
}

module.exports = {
    usersGet,
    usersNewGet,
    usersNewPost,
    usersIdUsuarioGet,
    usersIdUsuarioPut
}