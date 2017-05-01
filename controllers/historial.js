/**
 * Created by Raul Perez on 21/04/2017.
 */
'use strict'

const MovimientoModel = require('../models/movimiento'),
      BajaModel = require('../models/baja')

function historialMovimientosGet(req, res) {
    let usuario = req.session.user
    if( usuario.permisos === 1){ // si es administrador de sucursales
        // obtener los movimientos de productos basicos y no basicos de la sucursal

    }else{ // si es administrador general
        // obtener los movimientos de productos basicos y no basicos de todas las sucursales

    }
}

function historialBajasGet(req, res) {
    let usuario = req.session.user
    if( usuario.permisos === 1){ // si es administrador de sucursal
        // obtener las bajas de productos basicos y no basicos de la sucursal

    }else{ // si es administrador general
        // obtener las bajas de productos basicos y no basicos de todas las sucursales

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