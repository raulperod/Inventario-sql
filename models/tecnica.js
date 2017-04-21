/**
 * Created by Raul Perez on 12/04/2017.
 */
'use strict'

const TecnicaModel = require('./coneccion')

function getTecnicaById(idTecnica, render, printError) {
    TecnicaModel.query('SELECT * FROM tecnicas t WHERE t.idTecnica = ?', idTecnica, (error, resultado, fields) => {
        return(error) ? printError(error): render(resultado)
    })
}

function getTecnicas(render, printError) {
    let seleccion = 't.nombre, t.apellido, t.idTecnica, s.plaza'
    TecnicaModel.query(`SELECT ${seleccion} FROM tecnicas t INNER JOIN sucursales s ON t.idSucursal = s.idSucursal`, (error, resultado, fields) => {
        return(error) ? printError(error): render(resultado)
    })
}

function getTecnicasBySucursal(idSucursal, render, printError) {
    TecnicaModel.query('SELECT t.idTecnica, t.nombre, t.apellido FROM tecnicas t WHERE t.idSucursal = ?', idSucursal , (error, resultado, fields) => {
        return(error) ? printError(error): render(resultado)
    })
}

function createTecnica(tecnica, render, printError) {
    TecnicaModel.query('INSERT INTO tecnicas SET ?', tecnica, (error, resultado, fields) => {
        return(error) ? printError(error): render()
    })
}

function updateTecnica(tecnica, render, printError) {
    TecnicaModel.query('UPDATE tecnicas SET ? WHERE idTecnica = ?', [tecnica, tecnica.idTecnica], (error, resultado, fields) => {
        return(error) ? printError(error): render()
    })
}

module.exports = {
    getTecnicaById,
    getTecnicas,
    getTecnicasBySucursal,
    createTecnica,
    updateTecnica
}