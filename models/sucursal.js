/**
 * Created by Raul Perez on 11/04/2017.
 */
'use strict'

const SucursalModel = require('./coneccion')

function getSucursalById(idSucursal, seleccion, render, printError) {
    SucursalModel.query('SELECT ?? FROM sucursales WHERE idSucursal = ?', [seleccion, idSucursal], (error, resultado, fields) => {
        return(error) ? printError(error): render(resultado)
    });
}

function getSucursales(seleccion, render, printError) {
    SucursalModel.query('SELECT ?? FROM sucursales ', seleccion , (error, resultado, fields) => {
        return(error) ? printError(error): render(resultado)
    });
}

function getSucursalByPlaza(plaza , seleccion, render, printError) {
    SucursalModel.query('SELECT ?? FROM sucursales WHERE plaza = ?', [seleccion, plaza] , (error, resultado, fields) => {
        return(error) ? printError(error): render(resultado)
    });
}

function createSucursal(sucursal, render, printError) {
    SucursalModel.query('INSERT INTO sucursales SET ?', sucursal, (error, resultado, fields) => {
        return(error) ? printError(error): render();
    });
}

function updateSucursal(sucursal, render, printError) {
    SucursalModel.query('UPDATE sucursales SET ? WHERE idSucursal = ?', [sucursal,sucursal.idSucursal], (error, resultado, fields) => {
        return(error) ? printError(error): render();
    });
}

module.exports = {
    getSucursalById,
    getSucursales,
    getSucursalByPlaza,
    createSucursal,
    updateSucursal
}