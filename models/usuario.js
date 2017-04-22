/**
 * Created by Raul Perez on 11/04/2017.
 */
'use strict'

const UserModel = require('./coneccion')


function getUserById(idUser, next) {
    UserModel.query(`SELECT * FROM usuarios u WHERE u.idUsuario = ?`, idUser ,(error, resultado, fields) => {
        next(error, resultado[0])
    })
}

function getUserByUsername(username, next) {
    let seleccion = 'u.username, u.password, u.status, u.permisos, u.idSucursal'
    UserModel.query(`SELECT ${seleccion} FROM usuarios u WHERE u.username = ? `, username ,(error, resultado, fields) => {
        next(error, resultado[0])
    })
}

function getUsers(next) {
    let seleccion = 'u.username, u.password, u.nombre, u.apellido, u.permisos, u.status, u.idUsuario, s.plaza'
    UserModel.query(`SELECT ${seleccion} FROM usuarios u INNER JOIN sucursales s ON u.idSucursal = s.idSucursal AND NOT u.permisos = 2` , (error, resultado, fields) => {
        next(error, resultado)
    })
}

function getUsersBySucursal(idSucursal, next) {
    let seleccion = 'u.username, u.password, u.nombre, u.apellido, u.permisos, u.status, u.idUsuario'
    UserModel.query(`SELECT ${seleccion} FROM usuarios u WHERE u.idSucursal = ? AND u.permisos = 0`, idSucursal ,(error, resultado, fields) => {
        next(error, resultado)
    })
}

function createUser(user, next) {
    UserModel.query('INSERT INTO usuarios SET ?', user, (error, resultado, fields) => {
        next(error)
    })
}

function updateUser(user, next) {
    UserModel.query('UPDATE usuarios SET ? WHERE idUsuario = ?', [user,user.idUsuario], (error, resultado, fields) => {
        next(error)
    })
}


module.exports = {
    getUserById,
    getUserByUsername,
    getUsers,
    getUsersBySucursal,
    createUser,
    updateUser
}