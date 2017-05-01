/**
 * Created by Raul Perez on 12/04/2017.
 */
'use strict'

const TecnicaModel = require('./coneccion')

function getTecnicaById(idTecnica, next) {
    TecnicaModel.query('SELECT * FROM tecnicas t WHERE t.idTecnica = ?', idTecnica, (error, resultado, fields) => {
        next(error, resultado[0])
    })
}

function getIdTecnicaByFullName(idTecnica, next) {
    TecnicaModel.query(`SELECT t.idTecnica FROM tecnicas t WHERE concat(t.nombre,' ',t.apellido) = ?`, idTecnica, (error, resultado, fields) => {
        next(error, resultado[0].idTecnica)
    })
}

function getTecnicasNameBySucursal(idSucursal, next) {
    TecnicaModel.query(`SELECT concat(t.nombre,' ',t.apellido) nombre FROM tecnicas t WHERE t.idSucursal = ?`, idSucursal, (error, resultado, fields) => {
        next(error, resultado)
    })
}

function getTecnicas(next) {
    let seleccion = 't.nombre, t.apellido, t.idTecnica, s.plaza'
    TecnicaModel.query(`SELECT ${seleccion} FROM tecnicas t INNER JOIN sucursales s ON t.idSucursal = s.idSucursal`, (error, resultado, fields) => {
        next(error, resultado)
    })
}

function getTecnicasBySucursal(idSucursal, next) {
    TecnicaModel.query('SELECT t.idTecnica, t.nombre, t.apellido FROM tecnicas t WHERE t.idSucursal = ?', idSucursal , (error, resultado, fields) => {
        next(error, resultado)
    })
}

function createTecnica(tecnica, next) {
    TecnicaModel.query('INSERT INTO tecnicas SET ?', tecnica, (error, resultado, fields) => {
        next(error)
    })
}

function updateTecnica(tecnica, next) {
    TecnicaModel.query('UPDATE tecnicas SET ? WHERE idTecnica = ?', [tecnica, tecnica.idTecnica], (error, resultado, fields) => {
        next(error)
    })
}

module.exports = {
    getTecnicaById,
    getIdTecnicaByFullName,
    getTecnicasNameBySucursal,
    getTecnicas,
    getTecnicasBySucursal,
    createTecnica,
    updateTecnica
}