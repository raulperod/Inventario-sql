/**
 * Created by Raul Perez on 30/04/2017.
 */
'use strict'

const MovimientoModel = require('./coneccion')

function getMovimientosNoBasicos(next) {
    MovimientoModel.query(`SELECT p.nombre nombreProducto, m.cantidad, m.tipo, concat(u.nombre,' ',u.apellido) nombreUsuario, s.plaza, m.fecha
                           FROM movimientos m
                           JOIN productos p ON m.idProducto = p.idProducto
                           JOIN usuarios u ON m.idUsuario = u.idUsuario
                           JOIN sucursales s ON m.idSucursal = s.idSucursal 
                           `, (error, resultado, fields) => {
        next(error, resultado)
    })
}

function getMovimientosBasicos(next) {
    MovimientoModel.query(`SELECT p.nombre nombreProducto, concat(u.nombre,' ',u.apellido) nombreUsuario, concat(t.nombre,' ',t.apellido) nombreTecnica, s.plaza, m.fecha
                           FROM asignacionbasicos m
                           JOIN productos p ON m.idProducto = p.idProducto
                           JOIN usuarios u ON m.idUsuario = u.idUsuario
                           JOIN tecnicas t ON m.idTecnica = t.idTecnica
                           JOIN sucursales s ON m.idSucursal = s.idSucursal 
                           `, (error, resultado, fields) => {
        next(error, resultado)
    })
}

function getMovimientosNoBasicosBySucursal(idSucursal, next) {
    MovimientoModel.query(`SELECT p.nombre nombreProducto, m.cantidad, m.tipo, concat(u.nombre,' ',u.apellido) nombreUsuario, m.fecha
                           FROM movimientos m
                           JOIN productos p ON m.idProducto = p.idProducto
                           JOIN usuarios u ON m.idUsuario = u.idUsuario
                           WHERE m.idSucursal = ?
                           `, idSucursal, (error, resultado, fields) => {
        next(error, resultado)
    })
}

function getMovimientosBasicosBySucursal(idSucursal, next) {
    MovimientoModel.query(`SELECT p.nombre nombreProducto, concat(u.nombre,' ',u.apellido) nombreUsuario, concat(t.nombre,' ',t.apellido) nombreTecnica, m.fecha
                           FROM asignacionbasicos m
                           JOIN productos p ON m.idProducto = p.idProducto
                           JOIN usuarios u ON m.idUsuario = u.idUsuario
                           JOIN tecnicas t ON m.idTecnica = t.idTecnica
                           WHERE m.idSucursal = ? 
                           `, idSucursal, (error, resultado, fields) => {
        next(error, resultado)
    })
}

function createMovimientoNoBasico(movimiento, next) {
    MovimientoModel.query('INSERT INTO movimientos SET ?', movimiento, (error, resultado, fields) => {
        next(error)
    })
}

function createMovimientoBasico(movimiento, next) {
    MovimientoModel.query('INSERT INTO asignacionbasicos SET ?', movimiento, (error, resultado, fields) => {
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