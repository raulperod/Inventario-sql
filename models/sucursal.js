/**
 * Created by Raul Perez on 11/04/2017.
 */
'use strict'

const SucursalModel = require('./coneccion')

function getSucursalById(idSucursal,render,printError) {
    SucursalModel.query('SELECT * FROM sucursales WHERE idSucursal = ?', idSucursal, (error, resultado, fields) => {
        return(error) ? printError(error): render(resultado)
    });
}

function getUserByUsername(idUsername,render,printError) {
    SucursalModel.query('SELECT * FROM usuarios WHERE username = ?', idUsername, (error, resultado, fields) => {
        return(error) ? printError(error): render(resultado)
    });
}

function getAllUsers(render,printError) {
    SucursalModel.query('SELECT * FROM usuarios', (error, resultado, fields) => {
        return(error) ? printError(error): render(resultado)
    });
}

function getAllUserBySucursal(idSucursal, render, printError) {
    SucursalModel.query('SELECT * FROM usuarios WHERE idSucursal = ?', idSucursal ,(error, resultado, fields) => {
        return(error) ? printError(error): render(resultado)
    });
}

function createUser(user, render, printError) {
    SucursalModel.query('INSERT INTO usuarios SET ?', user, (error, resultado, fields) => {
        return(error) ? printError(error): render();
    });
}

function updateUser(user, render, printError) {
    SucursalModel.query('UPDATE usuario SET ? WHERE movie_id = ?', [user,user.idUsuario], (error, resultado, fields) => {
        return(error) ? printError(error): render();
    });
}


module.exports = {
    getUserById,
    getUserByUsername,
    getAllUsers,
    getAllUserBySucursal,
    createUser,
    updateUser
}