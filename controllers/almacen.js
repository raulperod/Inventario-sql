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
        AlmacenModel.getAlmacenForGeneralAdmin((error, almacen) => {
            if(error){
                Utilidad.printError(res, {msg: `Error al obtener el almacen: ${error}`, tipo: 0})
            } else {
                res.render('./almacen/manager', { usuario, almacen})
            }
        })
    }else{ // si es administrador de sucursal o recepcionista

    }
}

function almacenNewGet(req, res) {

}

function almacenNewPost(req, res) {

}

function almacenIdAlmacenAddPut(req, res) {

}

function almacenIdAlmacenSubPut(req, res) {

}

module.exports = {
    almacenGet,
    almacenNewGet,
    almacenNewPost,
    almacenIdAlmacenAddPut,
    almacenIdAlmacenSubPut
}