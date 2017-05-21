/**
 * Created by Raul Perez on 21/04/2017.
 */
'use strict'

const MovimientoModel = require('../models/movimiento'),
      BajaModel = require('../models/baja'),
      BasicoModel = require('../models/basico'),
      SucursalModel = require('../models/sucursal'),
      EstadisticaModel = require('../models/estadistica'),
      ProductoModel = require('../models/producto'),
      Utilidad = require('../ayuda/utilidad')

function historialMovimientosGet(req, res) {
    let usuario = req.session.user,
        idSucursal = usuario.idSucursal

    if( usuario.permisos === 1){ // si es administrador de sucursales
        // obtener los movimientos de productos basicos y no basicos de la sucursal
        MovimientoModel.getMovimientosNoBasicosBySucursal(idSucursal, (error, movimientos) => {
            if(error){
                Utilidad.printError(res, {msg:`Error al obtener los movimientos: ${error}`, tipo: 0})
                return
            }
            MovimientoModel.getMovimientosBasicosBySucursal(idSucursal, (error, asignaciones) => {
                if(error){
                    Utilidad.printError(res, {msg:`Error al obtener los movimientos: ${error}`, tipo: 0})
                    return
                }
                // unir movimientos
                res.render('./historial/movimientos',{usuario, movimientos, asignaciones})
            })
        })
    }else{ // si es administrador general
        // obtener los movimientos de productos basicos y no basicos de todas las sucursales
        // obtener los movimientos de productos basicos y no basicos de la sucursal
        MovimientoModel.getMovimientosNoBasicos((error, movimientos) => {
            if(error){
                Utilidad.printError(res, {msg:`Error al obtener los movimientos: ${error}`, tipo: 0})
                return
            }
            MovimientoModel.getMovimientosBasicos((error, asignaciones) => {
                if(error){
                    Utilidad.printError(res, {msg:`Error al obtener los movimientos: ${error}`, tipo: 0})
                    return
                }
                // unir movimientos
                res.render('./historial/movimientos',{usuario, movimientos, asignaciones})
            })
        })
    }
}

function historialBajasGet(req, res) {
    let usuario = req.session.user,
        idSucursal = usuario.idSucursal

    if( usuario.permisos === 1){ // si es administrador de sucursales
        // obtener los movimientos de productos basicos y no basicos de la sucursal
        BajaModel.getBajasNoBasicosBySucursal(idSucursal, (error, bajas) => {
            if(error){
                Utilidad.printError(res, {msg:`Error al obtener los movimientos: ${error}`, tipo: 0})
                return
            }
            BajaModel.getBajasBasicosBySucursal(idSucursal, (error, bajasBasicos) => {
                if(error){
                    Utilidad.printError(res, {msg:`Error al obtener los movimientos: ${error}`, tipo: 0})
                    return
                }
                // unir movimientos
                res.render('./historial/bajas',{usuario, bajas, bajasBasicos})
            })
        })
    }else{ // si es administrador general
        // obtener los movimientos de productos basicos y no basicos de todas las sucursales
        // obtener los movimientos de productos basicos y no basicos de la sucursal
        BajaModel.getBajasNoBasicos((error, bajas) => {
            if(error){
                Utilidad.printError(res, {msg:`Error al obtener los movimientos: ${error}`, tipo: 0})
                return
            }
            BajaModel.getBajasBasicos((error, bajasBasicos) => {
                if(error){
                    Utilidad.printError(res, {msg:`Error al obtener los movimientos: ${error}`, tipo: 0})
                    return
                }
                // unir movimientos
                res.render('./historial/bajas',{usuario, bajas, bajasBasicos})
            })
        })
    }
}

function historialSucursalGet(req, res) {
    BasicoModel.getBasicos( (error, basicos) => {
        (error) ? (
            Utilidad.printError(res, {msg:`Error al obtener los productos basicos: ${error}` , tipo: 0})
        ) : (
            res.render('./historial/sucursal', { basicos, usuario: req.session.user} )
        )
    })
}

function historialSucursalTopPost(req, res) {
    // obtengo las fechas
    let inicio = req.body.iniciot,
        final = sumarDia( req.body.finalt ),
        idSucursal = req.session.user.idSucursal

    EstadisticaModel.getTopTen(idSucursal, inicio, final, (error, topten) => {
        if(!error){
            res.send(topten)
        }
    })
}

function historialSucursalBasicosPost(req, res) {
    // obtengo las fechas
    let inicio = req.body.iniciob,
        final = sumarDia( req.body.finalb ),
        idSucursal = req.session.user.idSucursal,
        nombreProducto = req.body.basico

    // obtener el id del producto a comparar
    ProductoModel.getIdProductoAndIdCategoriaByName(nombreProducto,(error, producto) => {
        if(!error){
            EstadisticaModel.getComparacion(idSucursal, producto.idProducto, inicio, final, (error, comparacion) => {
                if(!error){
                    res.send(comparacion)
                }
            })
        }
    })
}

function historialGeneralGet(req, res) {
    SucursalModel.getPlazasOfSucursales((error, sucursales) => {
        if(error){
            Utilidad.printError(res, {msg:`Error al obtener las sucursales: ${error}` , tipo: 0})
            return
        }
        BasicoModel.getBasicos( (error, basicos) => {
            (error) ? (
                Utilidad.printError(res, {msg:`Error al obtener los productos basicos: ${error}` , tipo: 0})
            ) : (
                res.render('./historial/general', {basicos, sucursales, usuario: req.session.user} )
            )
        })
    })
}

function historialGeneralTopPost(req, res) {
    // obtengo las fechas
    let inicio = req.body.iniciot,
        final = sumarDia( req.body.finalt ),
        sucursal = req.body.sucursaltop

    // busco la sucursal por el nombre de la plaza
    SucursalModel.getIdSucursalByPlaza(sucursal, (error, idSucursal) => {
        if(!error){
            EstadisticaModel.getTopTen(idSucursal, inicio, final, (error, topten) => {
                if(!error){
                    res.send(topten)
                }
            })
        }
    })
}

function historialGeneralBasicosPost(req, res) {
    // obtengo las fechas
    let inicio = req.body.iniciob,
        final = sumarDia( req.body.finalb ),
        sucursal = req.body.sucursalbas,
        nombreProducto = req.body.basico

    SucursalModel.getIdSucursalByPlaza(sucursal, (error, idSucursal) => {
        if(!error){
            // obtener el id del producto a comparar
            ProductoModel.getIdProductoAndIdCategoriaByName(nombreProducto,(error, producto) => {
                if(!error) {
                    EstadisticaModel.getComparacion(idSucursal, producto.idProducto, inicio, final, (error, comparacion) => {
                        if(!error){
                            res.send(comparacion)
                        }
                    })
                }
            })
        }
    })
}

function sumarDia(fecha) {
    let nuevaFecha = fecha.split('-')
    let dia = parseInt( nuevaFecha[2] )
    dia++
    if ( dia < 10 ) dia = '0' + dia
    return  ( nuevaFecha[0] + '-' + nuevaFecha[1] + '-' + dia )
}

module.exports = {
    historialMovimientosGet,
    historialBajasGet,
    historialGeneralGet,
    historialSucursalGet,
    historialSucursalTopPost,
    historialSucursalBasicosPost,
    historialGeneralBasicosPost,
    historialGeneralTopPost
}