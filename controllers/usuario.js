/**
 * Created by Raul Perez on 11/04/2017.
 */
'use strict'

const UserModel = require('../models/usuario'),
      SucursalModel = require('../models/sucursal')

function usersGet(req, res) {
    let usuario = req.session.user
    // verifica que tipo de usuario es
    if( usuario.permisos === 2 ){  // si es admin general
        UserModel.getUsers( usuarios => { // si se pudieron obtener los usuarios
            res.render('./users/manager', { usuarios, usuario } )
        }, error => { // si hubo un error
            console.log(`Error al obtener los usuarios: ${error}`)
            res.json({ msg : `Error al obtener los usuarios: ${error}` , tipo:0 })
        })
    } else { // si es admin de sucursal
        let idSucursal = req.session.user.idSucursal // obtienes el id de la sucursal del usuario
        UserModel.getUsersBySucursal(idSucursal, usuarios => { // si se pudieron obtener los usuarios
            res.render('./users/manager', { usuarios, usuario } )
        }, error => { // si hubo un error
            console.log(`Error al obtener los usuarios: ${error}`)
            res.json({ msg: `Error al obtener los usuarios: ${error}`, tipo:0})
        })
    }
}

function usersNewGet(req, res) {
    let usuario = req.session.user
    if( usuario.permisos === 2 ){ // si es admin general
        SucursalModel.getPlazasOfSucursales( sucursales => { // si se pudo obtener las sucursales
            res.render('./users/new', { sucursales, usuario })
        }, error => { // si ocurrio un error
            console.log(`Error no se pudieron obtener las sucursales: ${error}`)
            res.json({ msg:`Error no se pudieron obtener las sucursales: ${error}`, tipo:0})
        })
    } else { // si es admin de sucursal
        res.render('./users/new',{ usuario })
    }
}

function usersNewPost(req, res) {
    const usuario = req.session.user
    if( usuario.permisos === 2 ){ // si es administrador general
        // declaro constantes necesarias
        let plaza = req.body.plaza
        // busco la sucursal del nuevo usuario
        SucursalModel.getIdSucursalByPlaza(plaza, idSucursal => {
            // genero el nuevo usuario
            let nuevoUsuario = {
                username: req.body.username.toLowerCase(),
                nombre: req.body.name,
                apellido: req.body.last_name,
                password: req.body.password,
                idSucursal: idSucursal,
                permisos: 1
            }
            // agrego al nuevo usuario
            UserModel.createUser(nuevoUsuario, () => {  // si se agrego correctamente
                res.redirect('/users')
            }, error => { // si hubo error
                console.log(`Error al agregar en nuevo usuario: ${error}`)
                // mando una alerta que el username esta repetido
                res.json({ msg: `Error al agregar en nuevo usuario: ${error}`, tipo: 1 })
            })
        }, error => {
            console.log(`Error al obtener la sucursal: ${error}`)
            res.json({ msg: `Error al obtener la sucursal: ${error}`, tipo:0})
        })
    } else { // si es administrador de sucursales
        // genero el nuevo usuario
        let nuevoUsuario = {
            username: req.body.username.toLowerCase(),
            nombre: req.body.name,
            apellido: req.body.last_name,
            password: req.body.password,
            idSucursal: usuario.idSucursal,
            permisos: 0
        }
        // agrego al nuevo usuario
        UserModel.createUser(nuevoUsuario, () => {  // si se agrego correctamente
            res.redirect('/users')
        }, error => { // si hubo error
            console.log(`Error al agregar en nuevo usuario: ${error}`)
            // mando una alerta que el username esta repetido
            res.json({ msg: `Error al agregar en nuevo usuario: ${error}`, tipo: 1 })
        })
    }
}

function usersIdUsuarioGet(req, res) {
    // declarar variables necesarias
    let usuario = req.session.user, // obtengo al usuario logeado
        idUsuario = req.params.idUsuario // obtengo el id del usuario a editar
    if( usuario.permisos === 2 ){ //  si es administrador general
        // busca las sucursales
        SucursalModel.getPlazasOfSucursales( sucursales => { // si no hubo error
            // busca al usuario a editar
            UserModel.getUserById(idUsuario, usuarioUpdate => { // si no hubo error
                res.render('./users/update', { sucursales, usuarioUpdate: usuarioUpdate[0], usuario })
            }, error => { // si hubo error
                console.log(`Error al obtener el usuario: ${error}`)
                res.json({ msg: `Error al obtener el usuario: ${error}`, tipo:0})
            })
        }, error => { // si hubo error
            console.log(`Error al obtener la sucursal: ${error}`)
            res.json({ msg: `Error al obtener la sucursal: ${error}`, tipo:0})
        })
    } else { // si es administrador de sucursal
        // obtengo al usuario a editar
        UserModel.getUserById(idUsuario, usuarioUpdate => { // si no hubo error
            res.render('./users/update', { usuarioUpdate: usuarioUpdate[0], usuario })
        }, error => { // si hubo error
            console.log(`Error al obtener el usuario: ${error}`)
            res.json({ msg: `Error al obtener el usuario: ${error}`, tipo:0})
        })
    }
}

function usersIdUsuarioPut(req ,res) {
    let usuario = req.session.user, // obtenemos el usuario logeado
        idUsuario = req.params.idUsuario // obtengo el id del usuario
    if( usuario.permisos === 2 ){ // si es administrado general
        let plaza = req.body.plaza  // obtengo la nueva sucursal del usuario
        // busco la nueva sucursal
        SucursalModel.getIdSucursalByPlaza(plaza, idSucursal => { // si no hubo error
            // creo al usuario con los cambios realizados
            let usuarioUpdate = {
                idUsuario,
                username: req.body.username,
                nombre: req.body.name,
                apellido: req.body.last_name,
                password: req.body.password,
                idSucursal,
                permisos:  req.body.permisos === "Administrador" ? 1 : 0,
                status: req.body.status === "Activo"
            }
            // guardo los cambios del usuario en la base de datos
            updateUser(res, usuarioUpdate)

        }, error => { // si hubo error al buscar la sucursal
            console.log(`Error al buscar la nueva sucursal: ${error}`)
            res.json({ msg : `Error al buscar la nueva sucursal: ${error}` , tipo : 0})
        })

    } else { // si es administrador de sucursal
        // creo al usuario con los cambios realizados
        let usuarioUpdate = {
            idUsuario,
            username: req.body.username,
            nombre: req.body.name,
            apellido: req.body.last_name,
            password: req.body.password,
            status: req.body.status === "Activo"
        }
        // guardo los cambios del usuario en la base de datos
        updateUser(res, usuarioUpdate)
    }
}

function updateUser(res, user) {
    UserModel.updateUser(user, () => { // si no hubo error al actualizar el usuario
        res.redirect('/users')
    }, error => { // si hubo error al actualizar
        // se repitio el username
        console.log(`Error al actualizar el usuario: ${error}`)
        // mando una alerta que se repitio el username
        res.json({ msg: `Error al actualizar el usuario: ${error}` , tipo: 1})
    })
}

module.exports = {
    usersGet,
    usersNewGet,
    usersNewPost,
    usersIdUsuarioGet,
    usersIdUsuarioPut
}