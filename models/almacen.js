/**
 * Created by Raul Perez on 21/04/2017.
 */
'use strict'

const AlmacenModel = require('./coneccion')

function getAlmacenForGeneralAdmin(next) {
    AlmacenModel
        .query(`SELECT a.cantidadAlmacen, p.nombre nombreProducto, p.codigo, c.nombre nombreCategoria, s.plaza 
                FROM almacen a 
                JOIN productos p on a.idProducto = p.idProducto
                JOIN categorias c on a.idCategoria = c.idCategoria
                JOIN sucursales s on a.idSucursal = s.idSucursal`
                , (error, resultado, fields) => {
            next(error, resultado)
    })
}

function getAlmacenForSucursalAdmin(idSucursal ,next) {
    AlmacenModel
        .query(`SELECT p.nombre nombreProducto, p.codigo, c.nombre nombreCategoria, a.cantidadAlmacen
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
    getAlmacenForGeneralAdmin,
    getAlmacenForSucursalAdmin,
    createAlmacen
}