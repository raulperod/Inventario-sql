/**
 * Created by Raul Perez on 30/04/2017.
 */
'use strict'

const BajaModel = require('./coneccion')

function getBajasNoBasicos(next) {
    BajaModel.query(`SELECT p.nombre nombreProducto, b.cantidad, concat(u.nombre,' ',u.apellido) nombreUsuario, s.plaza, b.fecha
                           FROM bajas b
                           JOIN productos p ON b.idProducto = p.idProducto
                           JOIN usuarios u ON b.idUsuario = u.idUsuario
                           JOIN sucursales s ON b.idSucursal = s.idSucursal 
                           `, (error, resultado, fields) => {
        next(error, resultado)
    })
}

function getBajasBasicos(next) {
    BajaModel.query(`SELECT p.nombre nombreProducto, concat(u.nombre,' ',u.apellido) nombreUsuario, concat(t.nombre,' ',t.apellido) nombreTecnica, s.plaza, b.fecha
                           FROM bajasbasicos b
                           JOIN productos p ON b.idProducto = p.idProducto
                           JOIN usuarios u ON b.idUsuario = u.idUsuario
                           JOIN tecnicas t ON b.idTecnica = t.idTecnica
                           JOIN sucursales s ON b.idSucursal = s.idSucursal 
                           `, (error, resultado, fields) => {
        next(error, resultado)
    })
}

function getBajasNoBasicosBySucursal(idSucursal, next) {
    BajaModel.query(`SELECT p.nombre nombreProducto, b.cantidad, concat(u.nombre,' ',u.apellido) nombreUsuario, s.plaza, b.fecha
                           FROM bajas b
                           JOIN productos p ON b.idProducto = p.idProducto
                           JOIN usuarios u ON b.idUsuario = u.idUsuario
                           WHERE b.idSucursal = ? 
                           `, idSucursal, (error, resultado, fields) => {
        next(error, resultado)
    })
}

function getBajasBasicosBySucursal(idSucursal, next) {
    BajaModel.query(`SELECT p.nombre nombreProducto, concat(u.nombre,' ',u.apellido) nombreUsuario, concat(t.nombre,' ',t.apellido) nombreTecnica, s.plaza, b.fecha
                           FROM bajasbasicos b
                           JOIN productos p ON b.idProducto = p.idProducto
                           JOIN usuarios u ON b.idUsuario = u.idUsuario
                           JOIN tecnicas t ON b.idTecnica = t.idTecnica
                           WHERE b.idSucursal = ? 
                           `, idSucursal, (error, resultado, fields) => {
        next(error, resultado)
    })
}

function createBajaNoBasico(baja, next) {
    BajaModel.query('INSERT INTO bajas SET ?', baja, (error, resultado, fields) => {
        next(error)
    })
}

function createBajaBasico(baja, next) {
    BajaModel.query('INSERT INTO bajasbasicos SET ?', baja, (error, resultado, fields) => {
        next(error)
    })
}

module.exports = {
    getBajasNoBasicos,
    getBajasBasicos,
    getBajasNoBasicosBySucursal,
    getBajasBasicosBySucursal,
    createBajaNoBasico,
    createBajaBasico
}