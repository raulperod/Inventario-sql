/**
 * Created by Raul Perez on 30/04/2017.
 */
'use strict'

const BajaModel = require('./coneccion')

function createBajaNoBasico(baja, next) {
    BajaModel.query('INSERT INTO bajasnobasicos SET ?', baja, (error, resultado, fields) => {
        next(error)
    })
}

function createBajaBasico(baja, next) {
    BajaModel.query('INSERT INTO bajasbasicos SET ?', baja, (error, resultado, fields) => {
        next(error)
    })
}

module.exports = {
    createBajaNoBasico,
    createBajaBasico
}