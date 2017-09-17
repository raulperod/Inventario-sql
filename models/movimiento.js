/**
 * Created by Raul Perez on 30/04/2017.
 */
'use strict'

const MovimientoModel = require('./coneccion')

function getMovimientosNoBasicosByIdSucursalAndCategoria(idSucursal, category, inicio, final, next) {
    MovimientoModel
        .query(`SELECT p.codigo, p.nombre nombreProducto, m.cantidad, m.tipo, concat(u.nombre,' ',u.apellido) nombreUsuario, m.fecha
                FROM movimientos m
                JOIN productos p ON m.idProducto = p.idProducto
                JOIN usuarios u ON m.idUsuario = u.idUsuario
                JOIN categorias c ON p.idCategoria = c.idCategoria
                WHERE (m.fecha BETWEEN ? AND ?) AND u.idSucursal = ? AND c.nombre = ?`, [inicio, final, idSucursal, category], (error, resultado, fields) => {

            next(error, resultado)
        })
}

function getMovimientosBasicosByIdSucursalAndCategoria(idSucursal, category, inicio, final, next) {
    MovimientoModel
        .query(`SELECT p.codigo, p.nombre nombreProducto, concat(u.nombre,' ',u.apellido) nombreUsuario, concat(t.nombre,' ',t.apellido) nombreTecnica, m.fecha
                FROM asignacionbasicos m
                JOIN productos p ON m.idProducto = p.idProducto
                JOIN usuarios u ON m.idUsuario = u.idUsuario
                JOIN tecnicas t ON m.idTecnica = t.idTecnica
                JOIN categorias c ON p.idCategoria = c.idCategoria
                WHERE (m.fecha BETWEEN ? AND ?) AND u.idSucursal = ? AND c.nombre = ?`, [inicio, final, idSucursal, category], (error, resultado, fields) => {

            next(error, resultado)
        })
}

function getMovimientosNoBasicosByPlazaAndCategoria(plaza, category, inicio, final, next) {
    MovimientoModel
        .query(`SELECT p.codigo, p.nombre nombreProducto, m.cantidad, m.tipo, concat(u.nombre,' ',u.apellido) nombreUsuario, m.fecha
                FROM movimientos m
                JOIN productos p ON m.idProducto = p.idProducto
                JOIN usuarios u ON m.idUsuario = u.idUsuario
                JOIN categorias c ON p.idCategoria = c.idCategoria
                JOIN sucursales s ON u.idSucursal = s.idSucursal
                WHERE (m.fecha BETWEEN ? AND ?) AND s.plaza = ? AND c.nombre = ?`, [inicio, final, plaza, category], (error, resultado, fields) => {

            next(error, resultado)
        })
}

function getMovimientosBasicosByPlazaAndCategoria(plaza, category, inicio, final, next) {
    MovimientoModel
        .query(`SELECT p.codigo, p.nombre nombreProducto, concat(u.nombre,' ',u.apellido) nombreUsuario, concat(t.nombre,' ',t.apellido) nombreTecnica, m.fecha
                FROM asignacionbasicos m
                JOIN productos p ON m.idProducto = p.idProducto
                JOIN usuarios u ON m.idUsuario = u.idUsuario
                JOIN tecnicas t ON m.idTecnica = t.idTecnica
                JOIN categorias c ON p.idCategoria = c.idCategoria
                JOIN sucursales s ON u.idSucursal = s.idSucursal
                WHERE (m.fecha BETWEEN ? AND ?) AND s.plaza = ? AND c.nombre = ?`, [inicio, final, plaza, category], (error, resultado, fields) => {

            next(error, resultado)
        })
}

function createMovimientoNoBasico(movimiento, next) {
    MovimientoModel
        .query(`INSERT INTO movimientos 
                SET ?`, movimiento, (error, resultado, fields) => {

            next(error)
        })
}

function createMovimientoBasico(movimiento, next) {
    MovimientoModel
        .query(`INSERT INTO asignacionbasicos 
                SET ?`, movimiento, (error, resultado, fields) => {

            next(error)
        })
}

module.exports = {
    getMovimientosNoBasicosByIdSucursalAndCategoria,
    getMovimientosBasicosByIdSucursalAndCategoria,
    getMovimientosNoBasicosByPlazaAndCategoria,
    getMovimientosBasicosByPlazaAndCategoria,
    createMovimientoNoBasico,
    createMovimientoBasico
}