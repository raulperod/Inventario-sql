/**
 * Created by Raul Perez on 30/04/2017.
 */
'use strict'

const BajaModel = require('./coneccion')

function getBajasNoBasicosByPlazaAndCategoria(plaza, categoria, inicio, final, next) {
    BajaModel
        .query(`SELECT p.codigo, p.nombre nombreProducto, b.cantidad, concat(u.nombre,' ',u.apellido) nombreUsuario, b.fecha
                FROM bajas b
                JOIN productos p ON b.idProducto = p.idProducto
                JOIN usuarios u ON b.idUsuario = u.idUsuario
                JOIN categorias c ON p.idCategoria = c.idCategoria
                JOIN sucursales s ON u.idSucursal = s.idSucursal
                WHERE (b.fecha BETWEEN ? AND ?) AND s.plaza = ? AND c.nombre = ?`, [inicio, final, plaza, categoria], (error, resultado, fields) => {

            next(error, resultado)
         })
}

function getBajasBasicosByPlazaAndCategoria(plaza, categoria, inicio, final, next) {
    BajaModel
        .query(`SELECT p.codigo, p.nombre nombreProducto, concat(u.nombre,' ',u.apellido) nombreUsuario, concat(t.nombre,' ',t.apellido) nombreTecnica, b.fecha
                FROM bajasbasicos b
                JOIN productos p ON b.idProducto = p.idProducto
                JOIN usuarios u ON b.idUsuario = u.idUsuario
                JOIN tecnicas t ON b.idTecnica = t.idTecnica
                JOIN categorias c ON p.idCategoria = c.idCategoria
                JOIN sucursales s ON u.idSucursal = s.idSucursal OR t.idSucursal = s.idSucursal
                WHERE (b.fecha BETWEEN ? AND ?) AND s.plaza = ? AND c.nombre = ?`, [inicio, final, plaza, categoria], (error, resultado, fields) => {

            next(error, resultado)
        })
}

function getBajasNoBasicosByIdSucursalAndCategoria(idSucursal, category, inicio, final, next) {
    BajaModel
        .query(`SELECT p.codigo, p.nombre nombreProducto, b.cantidad, concat(u.nombre,' ',u.apellido) nombreUsuario, b.fecha
                FROM bajas b
                JOIN productos p ON b.idProducto = p.idProducto
                JOIN usuarios u ON b.idUsuario = u.idUsuario
                JOIN categorias c ON p.idCategoria = c.idCategoria
                WHERE (b.fecha BETWEEN ? AND ?) AND u.idSucursal = ? AND c.nombre = ?`, [inicio, final, idSucursal, category], (error, resultado, fields) => {

            next(error, resultado)
        })
}

function getBajasBasicosByIdSucursalAndCategoria(idSucursal, category, inicio, final, next) {
    BajaModel
        .query(`SELECT p.codigo, p.nombre nombreProducto, concat(u.nombre,' ',u.apellido) nombreUsuario, concat(t.nombre,' ',t.apellido) nombreTecnica, b.fecha
                FROM bajasbasicos b
                JOIN productos p ON b.idProducto = p.idProducto
                JOIN usuarios u ON b.idUsuario = u.idUsuario
                JOIN tecnicas t ON b.idTecnica = t.idTecnica
                JOIN categorias c ON p.idCategoria = c.idCategoria
                WHERE (b.fecha BETWEEN ? AND ?) AND (u.idSucursal = ? OR t.idSucursal = ?) AND c.nombre = ?`, [inicio, final, idSucursal, idSucursal, category], (error, resultado, fields) => {

            next(error, resultado)
        })
}

function createBajaNoBasico(baja, next) {
    BajaModel
        .query(`INSERT INTO bajas 
                SET ?`, baja, (error, resultado, fields) => {

            next(error)
        })
}

function createBajaBasico(baja, next) {
    BajaModel
        .query(`INSERT INTO bajasbasicos 
                SET ?`, baja, (error, resultado, fields) => {

            next(error)
        })
}

module.exports = {
    getBajasNoBasicosByPlazaAndCategoria,
    getBajasBasicosByPlazaAndCategoria,
    getBajasNoBasicosByIdSucursalAndCategoria,
    getBajasBasicosByIdSucursalAndCategoria,
    createBajaNoBasico,
    createBajaBasico
}