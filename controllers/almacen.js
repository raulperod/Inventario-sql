/**
 * Created by Raul Perez on 21/04/2017.
 */
'use strict'

const AlmacenModel = require('../models/almacen'),
      Utilidad = require('../ayuda/utilidad')

function almacenGet(req, res) {
    let usuario = req.session.user
    if( usuario.permisos === 2){ // si es administrador general
        // obtengo el almacen
        AlmacenModel.getAlmacen((error, almacen) => {
            (error) ? (
                Utilidad.printError(res, {msg: `Error al obtener el almacen: ${error}`, tipo: 0})
            ) : (
                res.render('./almacen/manager', { usuario, almacen})
            )
        })
    }else{ // si es administrador de sucursal o recepcionista
        // obtengo el almacen
        AlmacenModel.getAlmacenBySucursal(usuario.idSucursal, (error, almacen) => {
            (error) ? (
                Utilidad.printError(res, {msg: `Error al obtener el almacen: ${error}`, tipo: 0})
            ) : (
                res.render('./almacen/manager', { usuario, almacen})
            )
        })
    }
}

function almacenIdAlmacenAddPut(req, res) {
// si no mandaron cambios
    if( parseInt(req.body.cantidad) === 0 ){
        res.send("") // no mando nada
    }else{
        let usuario = req.session.user
        // si no mandaron 0

    }
}

function almacenIdAlmacenSubPut(req, res) {
// si no mandaron cambios
    if( parseInt(req.body.cantidad) === 0 ){
        res.send("") // no mando nada
    }else{
        let usuario = req.session.user

    }
}

module.exports = {
    almacenGet,
    almacenIdAlmacenAddPut,
    almacenIdAlmacenSubPut
}