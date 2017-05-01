/**
 * Created by Raul Perez on 30/04/2017.
 */
'use strict'

const MovimientoModel = require('./coneccion')

function getMovimientosNoBasicos(next) {
    MovimientoModel.query(`SELECT p.nombre nombreProducto, m.cantidad, m.tipo, concat(u.nombre,' ',u.apellido) nombreUsuario, s.plaza, m.fecha
                           FROM movimientosnobasicos m
                           JOIN  
                            `, movimiento, (error, resultado, fields) => {
        next(error, resultado)
    })
}

function getMovimientosBasicos(next) {
    MovimientoModel.query(``, movimiento, (error, resultado, fields) => {
        next(error, resultado)
    })
}

function getMovimientosNoBasicosBySucursal(idSucursal, next) {
    MovimientoModel.query(``, idSucursal, (error, resultado, fields) => {
        next(error, resultado)
    })
}

function getMovimientosBasicosBySucursal(idSucursal, next) {
    MovimientoModel.query(``, idSucursal, (error, resultado, fields) => {
        next(error, resultado)
    })
}

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
    getMovimientosNoBasicos,
    getMovimientosBasicos,
    getMovimientosNoBasicosBySucursal,
    getMovimientosBasicosBySucursal,
    createMovimientoNoBasico,
    createMovimientoBasico
}