/**
 * Created by Raul Perez on 21/04/2017.
 */
'use strict'

const AlmacenModel = require('./coneccion')

function getAlmacenById(idAlmacen, next) {
    AlmacenModel
        .query(`SELECT a.idProducto, a.cantidadAlmacen 
                FROM almacen a 
                WHERE idAlmacen = ?` , idAlmacen ,(error, resultado, fields) => {

            next(error, resultado[0])
    })
}

function getAlmacenBySucursalAndProduct(idSucursal, idProducto, next) {
    AlmacenModel
        .query(`SELECT a.idAlmacen, a.cantidadAlmacen, a.cantidadConsumo 
                FROM almacen a 
                WHERE a.idSucursal = ? AND a.idProducto = ?` , [idSucursal, idProducto] ,(error, resultado, fields) => {

            next(error, resultado[0])
        })
}

function getConsumoById(idAlmacen, next) {
    AlmacenModel
        .query(`SELECT a.idProducto, a.cantidadAlmacen, a.cantidadConsumo 
                FROM almacen a 
                WHERE idAlmacen = ?` , idAlmacen ,(error, resultado, fields) => {

            next(error, resultado[0])
        })
}

function getAlmacenByPlazaAndCategory(plaza, categoria, next) {
    AlmacenModel
        .query(`SELECT a.cantidadAlmacen, p.nombre nombreProducto, p.codigo, p.minimo
                FROM almacen a 
                JOIN productos p on a.idProducto = p.idProducto
                JOIN categorias c on p.idCategoria = c.idCategoria AND c.nombre = ?
                JOIN sucursales s on a.idSucursal = s.idSucursal AND s.plaza = ?` , [categoria, plaza], (error, resultado, fields) => {

            next(error, resultado)
        })
}

function getAlmacenBySucursalAndCategory(idSucursal, categoria, next) {
    AlmacenModel
        .query(`SELECT a.idAlmacen, p.nombre nombreProducto, p.codigo, a.cantidadAlmacen, p.minimo, p.esBasico
                FROM almacen a
                JOIN productos p ON a.idProducto = p.idProducto
                JOIN categorias c ON p.idCategoria = c.idCategoria AND c.nombre = ?
                WHERE a.idSucursal = ?`  , [categoria, idSucursal] ,(error, resultado, fields) => {

            next(error, resultado)
        })
}

function getConsumoByPlazaAndCategory(plaza, categoria, next) {
    AlmacenModel
        .query(`SELECT p.nombre nombreProducto, p.codigo, a.cantidadConsumo 
                FROM almacen a 
                JOIN productos p on a.idProducto = p.idProducto
                JOIN categorias c on p.idCategoria = c.idCategoria AND c.nombre = ?
                JOIN sucursales s on a.idSucursal = s.idSucursal AND s.plaza = ?` 
                , [categoria, plaza], (error, resultado, fields) => {

            next(error, resultado)
        })
}

function getConsumoBySucursalAndCategory(idSucursal, categoria, next) {
    AlmacenModel
        .query(`SELECT a.idAlmacen, p.nombre nombreProducto, p.codigo, c.nombre nombreCategoria, a.cantidadConsumo, p.esBasico
                FROM almacen a
                JOIN productos p ON a.idProducto = p.idProducto
                JOIN categorias c ON p.idCategoria = c.idCategoria AND c.nombre = ?
                WHERE a.idSucursal = ?` , [categoria, idSucursal] ,(error, resultado, fields) => {

            next(error, resultado)
        })
}

function createAlmacen(almacen, next) {
    AlmacenModel
        .query(`INSERT INTO almacen 
                SET ?`, almacen, (error, resultado, fields) => {

            next(error)
        })
}

function updateAlmacen(almacen, next) {
    AlmacenModel
        .query(`UPDATE almacen 
                SET ? 
                WHERE idAlmacen = ?`, [almacen,almacen.idAlmacen], (error, resultado, fields) => {

            next(error)
        })
}

module.exports = {
    getAlmacenById,
    getAlmacenBySucursalAndProduct,
    getConsumoById,
    getAlmacenByPlazaAndCategory,
    getAlmacenBySucursalAndCategory,
    getConsumoByPlazaAndCategory,
    getConsumoBySucursalAndCategory,
    createAlmacen,
    updateAlmacen
}