/**
 * Created by Raul Perez on 12/04/2017.
 */
'use strict'

const TecnicaModel = require('./coneccion')

function getTecnicaById(idTecnica, seleccion, render, printError) {
    TecnicaModel.query('SELECT ?? FROM tecnicas WHERE idTecnica = ?', [seleccion, idTecnica], (error, resultado, fields) => {
        return(error) ? printError(error): render(resultado)
    });
}

function getTecnicas(seleccion, render, printError) {
    TecnicaModel.query('SELECT ?? FROM tecnicas', seleccion , (error, resultado, fields) => {
        return(error) ? printError(error): render(resultado)
    });
}

function getTecnicasBySucursal(idSucursal, seleccion , render, printError) {
    TecnicaModel.query('SELECT ?? FROM tecnicas WHERE idSucursal = ?', [seleccion, idSucursal] , (error, resultado, fields) => {
        return(error) ? printError(error): render(resultado)
    });
}

function createTecnica(tecnica, render, printError) {
    TecnicaModel.query('INSERT INTO tecnicas SET ?', tecnica, (error, resultado, fields) => {
        return(error) ? printError(error): render();
    });
}

function updateTecnica(tecnica, render, printError) {
    TecnicaModel.query('UPDATE tecnicas SET ? WHERE idTecnica = ?', [tecnica,tecnica.idTecnica], (error, resultado, fields) => {
        return(error) ? printError(error): render();
    });
}

module.exports = {
    getTecnicaById,
    getTecnicas,
    getTecnicasBySucursal,
    createTecnica,
    updateTecnica
}