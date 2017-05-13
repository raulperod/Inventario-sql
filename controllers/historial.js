/**
 * Created by Raul Perez on 21/04/2017.
 */
'use strict'

const MovimientoModel = require('../models/movimiento'),
      BajaModel = require('../models/baja'),
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
                res.render('./historial/movimientos',{usuario, bajas, bajasBasicos})
            })
        })
    }
}

function historialGeneralGet(req, res) {
    res.redirect('/almacen')
}

function historialSucursalGet(req, res) {
    res.redirect('/almacen')
}

function historialDatosGeneralGet(req, res) {

}

function historialDatosSucursalGet(req, res) {

}

module.exports = {
    historialMovimientosGet,
    historialBajasGet,
    historialGeneralGet,
    historialSucursalGet,
    historialDatosGeneralGet,
    historialDatosSucursalGet
}