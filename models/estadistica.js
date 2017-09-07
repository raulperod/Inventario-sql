/**
 * Created by Raul Perez on 20/05/2017.
 */
'use strict'

const EstadisticaModel = require('./coneccion')

function getTopTen(idSucursal, inicio, final, next) {
    EstadisticaModel
        .query(`SELECT p.nombre, SUM(cantidad) cantidad 
                FROM bajas b 
                JOIN productos p ON p.idProducto = b.idProducto 
                WHERE p.esBasico = 0 AND b.idSucursal = ? AND (b.fecha BETWEEN ? AND ?)  
                GROUP BY p.nombre` , [idSucursal, inicio, final], (error, resultado, fields) => {

            next(error, resultado)
        })
}

function getComparacion(idSucursal, idProducto, inicio, final, next) {
    EstadisticaModel
        .query(`SELECT concat(t.nombre, ' ', t.apellido) nombre, COUNT(*) cantidad
                FROM bajasbasicos b 
                JOIN tecnicas t ON t.idTecnica = b.idTecnica
                WHERE (b.idSucursal = ?) AND (b.idProducto = ?) AND (b.fecha BETWEEN ? AND ?) 
                GROUP BY nombre` , [idSucursal, idProducto, inicio, final], (error, resultado, fields) => {

            next(error, resultado)
        })
}

module.exports = {
    getTopTen,
    getComparacion
}