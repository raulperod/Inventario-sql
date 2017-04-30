/**
 * Created by Raul Perez on 21/04/2017.
 */
'use strict'

const AlmacenModel = require('./coneccion')

function getAlmacen(next) {
    AlmacenModel
        .query(`SELECT a.cantidadAlmacen, p.nombre nombreProducto, p.codigo, p.minimo, c.nombre nombreCategoria, s.plaza 
                FROM almacen a 
                JOIN productos p on a.idProducto = p.idProducto
                JOIN categorias c on a.idCategoria = c.idCategoria
                JOIN sucursales s on a.idSucursal = s.idSucursal`
                , (error, resultado, fields) => {
            next(error, resultado)
    })
}

function getAlmacenBySucursal(idSucursal ,next) {
    AlmacenModel
        .query(`SELECT p.nombre nombreProducto, p.codigo, c.nombre nombreCategoria, a.cantidadAlmacen, p.minimo, p.esBasico
                FROM almacen a
                JOIN productos p ON a.idProducto = p.idProducto
                JOIN categorias c ON a.idCategoria = c.idCategoria
                WHERE a.idSucursal = ?`
            , idSucursal ,(error, resultado, fields) => {
                next(error, resultado)
            })
}

function getConsumo(next) {
    AlmacenModel
        .query(`SELECT p.nombre nombreProducto, p.codigo, c.nombre nombreCategoria, a.cantidadConsumo, s.plaza 
                FROM almacen a 
                JOIN productos p on a.idProducto = p.idProducto
                JOIN categorias c on a.idCategoria = c.idCategoria
                JOIN sucursales s on a.idSucursal = s.idSucursal`
            , (error, resultado, fields) => {
                next(error, resultado)
            })
}

function getConsumoBySucursal(idSucursal ,next) {
    AlmacenModel
        .query(`SELECT p.nombre nombreProducto, p.codigo, c.nombre nombreCategoria, a.cantidadConsumo, p.esBasico
                FROM almacen a
                JOIN productos p ON a.idProducto = p.idProducto
                JOIN categorias c ON a.idCategoria = c.idCategoria
                WHERE a.idSucursal = ?`
            , idSucursal ,(error, resultado, fields) => {
                next(error, resultado)
            })
}

function createAlmacen(almacen, next) {
    AlmacenModel.query('INSERT INTO almacen SET ?', almacen, (error, resultado, fields) => {
        next(error)
    })
}

module.exports = {
    getAlmacen,
    getAlmacenBySucursal,
    getConsumo,
    getConsumoBySucursal,
    createAlmacen
}