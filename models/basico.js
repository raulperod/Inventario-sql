/**
 * Created by Raul Perez on 30/04/2017.
 */
'use strict'

const BasicoModel = require('./coneccion')

function getBasicoByProductAndTecnica(idProducto,idTecnica, next) {
    BasicoModel
        .query(`SELECT b.enUso 
                FROM basicosenuso b 
                WHERE b.idProducto = ? AND b.idTecnica = ?`, [idProducto, idTecnica], (error, resultado, fields) => {

            next(error, resultado[0])
        })
}

function createBasico(basico, next) {
    BasicoModel
        .query(`INSERT INTO basicosenuso 
                SET ?`, basico, (error, resultado, fields) => {

            next(error, resultado)
        })
}

function updateBasico(basico, next) {
    BasicoModel
        .query(`UPDATE basicosenuso 
                SET ? 
                WHERE idTecnica = ? AND idProducto = ?`, [basico, basico.idTecnica, basico.idProducto], (error, resultado, fields) => {

            next(error)
        })
}

module.exports = {
    getBasicoByProductAndTecnica,
    createBasico,
    updateBasico
}