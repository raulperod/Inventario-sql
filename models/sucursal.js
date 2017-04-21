/**
 * Created by Raul Perez on 11/04/2017.
 */
'use strict'

const SucursalModel = require('./coneccion')

function getSucursalById(idSucursal, render, printError) {
    SucursalModel.query('SELECT * FROM sucursales s WHERE s.idSucursal = ?', idSucursal, (error, resultado, fields) => {
        return(error) ? printError(error): render(resultado)
    })
}

function getIdSucursalByPlaza(plaza, render, printError) {
    SucursalModel.query('SELECT s.idSucursal FROM sucursales s WHERE s.plaza = ?',  plaza , (error, resultado, fields) => {
        return(error) ? printError(error): render(resultado[0].idSucursal)
    })
}

function getPlazasOfSucursales( render, printError) {
    SucursalModel.query('SELECT s.plaza FROM sucursales s', (error, resultado, fields) => {
        return(error) ? printError(error): render(resultado)
    })
}

function getSucursales( render, printError) {
    SucursalModel.query('SELECT * FROM sucursales', (error, resultado, fields) => {
        return(error) ? printError(error): render(resultado)
    })
}

function createSucursal(sucursal, render, printError) {
    SucursalModel.query('INSERT INTO sucursales SET ?', sucursal, (error, resultado, fields) => {
        return(error) ? printError(error): render()
    })
}

function updateSucursal(sucursal, render, printError) {
    SucursalModel.query('UPDATE sucursales s SET ? WHERE s.idSucursal = ?', [sucursal,sucursal.idSucursal], (error, resultado, fields) => {
        return(error) ? printError(error): render()
    })
}

module.exports = {
    getSucursalById,
    getPlazasOfSucursales,
    getIdSucursalByPlaza,
    getSucursales,
    createSucursal,
    updateSucursal
}