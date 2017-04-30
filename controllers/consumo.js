/**
 * Created by Raul Perez on 21/04/2017.
 */
'use strict'

const AlmacenModel = require('../models/almacen'),
    Utilidad = require('../ayuda/utilidad')

function consumosGet(req, res) {
    let usuario = req.session.user
    if( usuario.permisos === 2){ // si es administrador general
        // obtengo el consumo
        AlmacenModel.getConsumo((error, consumos) => {
            (error) ? (
                Utilidad.printError(res, {msg: `Error al obtener el consumo: ${error}`, tipo: 0})
            ) : (
                res.render('./consumos/manager', { usuario, consumos})
            )
        })
    }else{ // si es administrador de sucursal o recepcionista
        // obtengo el consumo
        AlmacenModel.getConsumoBySucursal(usuario.idSucursal, (error, consumos) => {
            (error) ? (
                Utilidad.printError(res, {msg: `Error al obtener el consumo: ${error}`, tipo: 0})
            ) : (
                res.render('./consumos/manager', { usuario, consumos})
            )
        })
    }
}

function consumosIdConsumoPut(req, res) {

}

module.exports = {
    consumosGet,
    consumosIdConsumoPut
}