/**
 * Created by Raul Perez on 11/04/2017.
 */
'use strict'

const UserModel = require('./coneccion')

function getUserById(idUser,render,printError) {
    UserModel.query('SELECT * FROM usuarios WHERE idUsuario = ?', idUser, (error, resultado, fields) => {
        return(error) ? printError(error): render(resultado)
    });
}

function getUserByUsername(idUsername,render,printError) {
    UserModel.query('SELECT * FROM usuarios WHERE username = ?', idUsername, (error, resultado, fields) => {
        return(error) ? printError(error): render(resultado)
    });
}

function getUsers(render,printError) {
    UserModel.query('SELECT * FROM usuarios', (error, resultado, fields) => {
        return(error) ? printError(error): render(resultado)
    });
}

function getUsersBySucursal(idSucursal, render, printError) {
    UserModel.query('SELECT * FROM usuarios WHERE idSucursal = ?', idSucursal ,(error, resultado, fields) => {
        return(error) ? printError(error): render(resultado)
    });
}

function createUser(user, render, printError) {
    UserModel.query('INSERT INTO usuarios SET ?', user, (error, resultado, fields) => {
        return(error) ? printError(error): render();
    });
}

function updateUser(user, render, printError) {
    UserModel.query('UPDATE usuario SET ? WHERE movie_id = ?', [user,user.idUsuario], (error, resultado, fields) => {
        return(error) ? printError(error): render();
    });
}


module.exports = {
    getUserById,
    getUserByUsername,
    getUsers,
    getUsersBySucursal,
    createUser,
    updateUser
}