/**
 * Created by Raul Perez on 30/04/2017.
 */
'use strict'

const MovimientoModel = require('./coneccion')

function createMovimientoNoBasico(movimiento, next) {
    MovimientoModel.query('INSERT INTO movimientosnobasicos SET ?', movimiento, (error, resultado, fields) => {
        next(error)
    })
}

function createMovimientoBasico(movimiento, next) {
    MovimientoModel.query('INSERT INTO movimientosbasicos SET ?', movimiento, (error, resultado, fields) => {
        next(error)
    })
}

module.exports = {
    createMovimientoNoBasico,
    createMovimientoBasico
}