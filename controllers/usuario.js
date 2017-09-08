/**
 * Created by Raul Perez on 11/04/2017.
 */
'use strict'

const UserModel = require('../models/usuario'),
      SucursalModel = require('../models/sucursal'),
      Utilidad = require('../ayuda/utilidad'),
      bcrypt = require('bcrypt-nodejs')

function usersGet(req, res) {
    let usuario = req.session.user
    // verifica que tipo de usuario es
    if( usuario.permisos === 2 ){  // si es admin general
        UserModel.getUsers((error, usuarios) => { // si se pudieron obtener los usuarios
            (error) ? ( // si hubo error
                Utilidad.printError(res, {msg: `Error al obtener los usuarios: ${error}`, tipo: 0})
            ) : ( // si no hubo error
                res.render('./users/manager', {usuarios, usuario})
            )
        })
    } else { // si es admin de sucursal
        let idSucursal = req.session.user.idSucursal // obtienes el id de la sucursal del usuario
        UserModel.getUsersBySucursal(idSucursal, (error, usuarios) => { // si se pudieron obtener los usuarios
            (error) ? ( // si hubo error
                Utilidad.printError(res, {msg: `Error al obtener los usuarios: ${error}`, tipo: 0})
            ) : ( // si no hubo error
                res.render('./users/manager', {usuarios, usuario})
            )
        })
    }
}

function usersNewGet(req, res) {
    let usuario = req.session.user
    if( usuario.permisos === 2 ){ // si es admin general
        SucursalModel.getPlazasOfSucursales( (error, sucursales) => { // si se pudo obtener las sucursales
            (error) ? ( // si hubo error
                Utilidad.printError(res, {msg: `Error no se pudieron obtener las sucursales: ${error}`, tipo: 0})
            ) : ( // si no hubo error
                res.render('./users/new', {sucursales, usuario})
            )
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
        SucursalModel.getIdSucursalByPlaza(plaza, (error, idSucursal) => {
            if (error) {
                Utilidad.printError(res, {msg: `Error al obtener la sucursal: ${error}`, tipo: 0})
                return
            }
            // genero el nuevo usuario
            let nuevoUsuario = {
                username: req.body.username.toLowerCase(),
                nombre: req.body.name,
                apellido: req.body.last_name,
                password: req.body.password,
                idSucursal: idSucursal,
                permisos: 1
            }
            // encripto la clave
            nuevoUsuario.password = bcrypt.hashSync(nuevoUsuario.password)
            // agrego al usuario
            createUser(res, nuevoUsuario)
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
        // encripto la clave
        nuevoUsuario.password = bcrypt.hashSync(nuevoUsuario.password)
        // agrego al usuario
        createUser(res, nuevoUsuario)
    }
}

function usersIdUsuarioGet(req, res) {
    // declarar variables necesarias
    let usuario = req.session.user, // obtengo al usuario logeado
        idUsuario = req.params.idUsuario // obtengo el id del usuario a editar
    if( usuario.permisos === 2 ){ //  si es administrador general
        // busca las sucursales
        SucursalModel.getPlazasOfSucursales( (error, sucursales) => { // si no hubo error
            // si hubo error
            if(error){
                Utilidad.printError(res, { msg: `Error al obtener la sucursal: ${error}`, tipo:0})
                return
            }
            // busca al usuario a editar
            UserModel.getUserById(idUsuario, (error, usuarioUpdate) => { // si no hubo error
                (error) ? (
                    Utilidad.printError(res, { msg: `Error al obtener el usuario: ${error}`, tipo:0})
                ) : (
                    res.render('./users/update', { sucursales, usuarioUpdate, usuario })
                )
            })
        })
    } else { // si es administrador de sucursal
        // obtengo al usuario a editar
        UserModel.getUserById(idUsuario, (error, usuarioUpdate) => { // si no hubo error
            (error) ? ( // si hubo error
                Utilidad.printError(res, { msg: `Error al obtener el usuario: ${error}`, tipo:0})
            ) : ( // si no hubo error
                res.render('./users/update', { usuarioUpdate, usuario })
            )
        })
    }
}

function usersIdUsuarioPut(req ,res) {
    let usuario = req.session.user, // obtenemos el usuario logeado
        idUsuario = req.params.idUsuario // obtengo el id del usuario
    if( usuario.permisos === 2 ){ // si es administrado general
        let plaza = req.body.plaza  // obtengo la nueva sucursal del usuario
        // busco la nueva sucursal
        SucursalModel.getIdSucursalByPlaza(plaza, (error, idSucursal) => { // si no hubo error
            if (error){
                Utilidad.printError(res, { msg : `Error al buscar la nueva sucursal: ${error}` , tipo : 0})
                return
            }
            // creo al usuario con los cambios realizados
            let usuarioUpdate = {
                idUsuario,
                username: req.body.username.toLowerCase(),
                nombre: req.body.name,
                apellido: req.body.last_name,
                password: req.body.password,
                idSucursal,
                permisos:  req.body.permisos === "Administrador" ? 1 : 0,
                status: req.body.status === "Activo"
            }
            // encripto la clave
            usuarioUpdate.password = bcrypt.hashSync(usuarioUpdate.password)
            // guardo los cambios del usuario en la base de datos
            updateUser(res, usuarioUpdate)
        })
    } else { // si es administrador de sucursal
        // creo al usuario con los cambios realizados
        let usuarioUpdate = {
            idUsuario,
            username: req.body.username.toLowerCase(),
            nombre: req.body.name,
            apellido: req.body.last_name,
            password: req.body.password,
            status: req.body.status === "Activo"
        }
        // encripto la clave
        usuarioUpdate.password = bcrypt.hashSync(usuarioUpdate.password)
        // guardo los cambios del usuario en la base de datos
        updateUser(res, usuarioUpdate)
    }
}

function createUser(res, user) {    
    UserModel.createUser(user, error => {  // si se agrego correctamente
        (error) ? ( // si hubo un error
            // mando una alerta que el username esta repetido
            Utilidad.printError(res, { msg: `Error al agregar en nuevo usuario: ${error}`, tipo: 1 })
        ) : ( // si no hubo error
            //res.redirect('/users')
            res.json({msg:"",tipo:3})
        )
    })
}

function updateUser(res, user) {
    
    UserModel.updateUser(user, error => { // si no hubo error al actualizar el usuario
        (error) ? ( // se repitio el username
            // mando una alerta que se repitio el username
            Utilidad.printError(res, { msg: `Error al actualizar el usuario: ${error}` , tipo: 1})
        ) : ( // si no hubo error
            //res.redirect('/users')
            res.json({ msg: "", tipo:3 })
        )
    })
}

module.exports = {
    usersGet,
    usersNewGet,
    usersNewPost,
    usersIdUsuarioGet,
    usersIdUsuarioPut
}