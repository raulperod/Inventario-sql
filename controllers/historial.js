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
        MovimientoModel.getMovimientosNoBasicosBySucursal(idSucursal, (error, movimientosNoBasicos) => {
            if(error){
                Utilidad.printError(res, {msg:`Error al obtener los movimientos: ${error}`, tipo: 0})
                return
            }
            MovimientoModel.getMovimientosBasicosBySucursal(idSucursal, (error, movimientosBasicos) => {
                if(error){
                    Utilidad.printError(res, {msg:`Error al obtener los movimientos: ${error}`, tipo: 0})
                    return
                }
                // unir movimientos
                res.render('./historial/movimientos',{usuario,movimientosNoBasicos,movimientosBasicos})
            })
        })
    }else{ // si es administrador general
        // obtener los movimientos de productos basicos y no basicos de todas las sucursales
        // obtener los movimientos de productos basicos y no basicos de la sucursal
        MovimientoModel.getMovimientosNoBasicos((error, movimientosNoBasicos) => {
            if(error){
                Utilidad.printError(res, {msg:`Error al obtener los movimientos: ${error}`, tipo: 0})
                return
            }
            MovimientoModel.getMovimientosBasicos((error, movimientosBasicos) => {
                if(error){
                    Utilidad.printError(res, {msg:`Error al obtener los movimientos: ${error}`, tipo: 0})
                    return
                }
                // unir movimientos
                res.render('./historial/movimientos',{usuario,movimientosNoBasicos,movimientosBasicos})
            })
        })
    }
}

function historialBajasGet(req, res) {
    let usuario = req.session.user,
        idSucursal = usuario.idSucursal

    if( usuario.permisos === 1){ // si es administrador de sucursales
        // obtener los movimientos de productos basicos y no basicos de la sucursal
        BajaModel.getBajasNoBasicosBySucursal(idSucursal, (error, bajasNoBasicos) => {
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
                res.render('./historial/bajas',{usuario, bajasNoBasicos, bajasBasicos})
            })
        })
    }else{ // si es administrador general
        // obtener los movimientos de productos basicos y no basicos de todas las sucursales
        // obtener los movimientos de productos basicos y no basicos de la sucursal
        BajaModel.getBajasNoBasicos((error, bajasNoBasicos) => {
            if(error){
                Utilidad.printError(res, {msg:`Error al obtener los movimientos: ${error}`, tipo: 0})
                return
            }
            BajaModel.getBajasBasicos((error, bajaosBasicos) => {
                if(error){
                    Utilidad.printError(res, {msg:`Error al obtener los movimientos: ${error}`, tipo: 0})
                    return
                }
                // unir movimientos
                res.render('./historial/movimientos',{usuario, bajasNoBasicos, bajasBasicos})
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