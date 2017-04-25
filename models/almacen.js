/**
 * Created by Raul Perez on 21/04/2017.
 */
'use strict'

const AlmacenModel = require('./coneccion')

function createAlmacen(almacen, next) {
    AlmacenModel.query('INSERT INTO almacen SET ?', almacen, (error, resultado, fields) => {
        next(error)
    })
}

module.exports = {
    createAlmacen
}