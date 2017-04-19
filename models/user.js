/**
 * Created by Raul Perez on 11/04/2017.
 */
'use strict'

const UserModel = require('./coneccion')

function getUserById(idUser, seleccion, render, printError) {
    UserModel.query('SELECT ?? FROM usuario WHERE idUsuario = ?', [seleccion, idUser], (error, resultado, fields) => {
        return(error) ? printError(error): render(resultado)
    })
}

function getUserByUsername(idUsername, seleccion, render, printError) {
    UserModel.query('SELECT ?? FROM usuario WHERE username = ?', [seleccion, idUsername], (error, resultado, fields) => {
        return(error) ? printError(error): render(resultado)
    })
}

function getUsers(seleccion, render, printError) {
    UserModel.query('SELECT ?? FROM usuario', seleccion , (error, resultado, fields) => {
        return(error) ? printError(error): render(resultado)
    })
}

function getUsersBySucursal(idSucursal, seleccion , render, printError) {
    UserModel.query('SELECT ?? FROM usuario WHERE idSucursal = ?', [seleccion, idSucursal] , (error, resultado, fields) => {
        return(error) ? printError(error): render(resultado)
    })
}

function createUser(user, render, printError) {
    UserModel.query('INSERT INTO usuario SET ?', user, (error, resultado, fields) => {
        return(error) ? printError(error): render()
    })
}

function updateUser(user, render, printError) {
    UserModel.query('UPDATE usuario SET ? WHERE idUsuario = ?', [user,user.idUsuario], (error, resultado, fields) => {
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