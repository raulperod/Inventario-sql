/**
 * Created by Raul Perez on 11/04/2017.
 */
'use strict'

const SucursalModel = require('./coneccion')

function getSucursales(seleccion, render, printError) {
    SucursalModel.query('SELECT ?? FROM sucursales ', seleccion ,(error, resultado, fields) => {
        return(error) ? printError(error): render(resultado)
    });
}

function getSucursalByPlaza(plaza , seleccion, render, printError) {
    SucursalModel.query('SELECT ?? FROM sucursales WHERE plaza = ?', [seleccion, plaza] ,(error, resultado, fields) => {
        return(error) ? printError(error): render(resultado)
    });
}

module.exports = {
    getSucursales,
    getSucursalByPlaza
}