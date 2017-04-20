/**
 * Created by Raul Perez on 11/04/2017.
 */
'use strict'

const UserModel = require('./coneccion')

function getUserById(idUser, seleccion, render, printError) {
    UserModel.query('SELECT ?? FROM usuarios WHERE idUsuario = ?', [seleccion, idUser], (error, resultado, fields) => {
        return(error) ? printError(error): render(resultado)
    })
}

function getUserByUsername(idUsername, seleccion, render, printError) {
    UserModel.query('SELECT ?? FROM usuarios WHERE username = ?', [seleccion, idUsername], (error, resultado, fields) => {
        return(error) ? printError(error): render(resultado)
    })
}

function getUsers(render, printError) {
    let seleccion = 'u.username, u.password, u.nombre, u.apellido, u.permisos, u.status, u.idUsuario, s.plaza'
    UserModel.query(`SELECT ${seleccion} FROM usuarios u INNER JOIN sucursales s ON u.idSucursal = s.idSucursal AND NOT u.permisos = 2`, seleccion , (error, resultado, fields) => {
        return(error) ? printError(error): render(resultado)
    })
}

function getUsersBySucursal(idSucursal, render, printError) {
    UserModel.query('SELECT * FROM usuarios u WHERE u.idSucursal = ? AND u.permisos = 0', idSucursal , (error, resultado, fields) => {
        return(error) ? printError(error): render(resultado)
    })
}

function createUser(user, render, printError) {
    UserModel.query('INSERT INTO usuarios SET ?', user, (error, resultado, fields) => {
        return(error) ? printError(error): render()
    })
}

function updateUser(user, render, printError) {
    UserModel.query('UPDATE usuarios SET ? WHERE idUsuario = ?', [user,user.idUsuario], (error, resultado, fields) => {
        return(error) ? printError(error): render()
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