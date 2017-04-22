/**
 * Created by Raul Perez on 12/04/2017.
 */
'use strict'

const SucursalModel = require('../models/sucursal'),
      Utilidad = require('../ayuda/utilidad')

function sucursalesGet(req, res) {
    // busco las sucursales
    SucursalModel.getSucursales( (error, sucursales) => {
        (error) ? ( // si hubo error
            Utilidad.printError(res, { msg: `Error al obtener las sucursales: ${error}`, tipo: 0})
        ) : ( // si no hubo error
            res.render('./sucursales/manager', { sucursales, usuario: req.session.user })
        )
    })
}

function sucursalesNewGet(req, res) {
    res.render('./sucursales/new', { usuario : req.session.user })
}

function sucursalesNewPost(req, res) {
    // creo la nueva sucursal
    let nuevaSucursal = {
        plaza: req.body.plaza,
        ciudad: req.body.ciudad
    }
    // guardo la nueva sucursal en la base de datos
    SucursalModel.createSucursal(nuevaSucursal, error => {
        (error) ? ( // si hubo error
            Utilidad.printError(res, { msg: `Error al guardar la nueva sucursal: ${error}`, tipo: 0})
        ) : ( // si no hubo error
            res.redirect('/sucursales')
        )
    })
}

function sucursalesIdSucursalGet(req, res) {
    // declaro variables necesarias
    let idSucursal = req.params.idSucursal,
        usuario = req.session.user
    // busco la sucursal a editar
    SucursalModel.getSucursalById(idSucursal, (error, sucursalUpdate) => {
        (error) ? ( // si hubo error
            Utilidad.printError(res, { msg: `Error al obtener la sucursal: ${error}`, tipo: 0 })
        ) : ( // si no hubo error
            res.render('./sucursales/update', {  usuario, sucursalUpdate })
        )
    })
}

function sucursalesIdSucursalPut(req, res) {
    // obtengo la sucursal con los cambios realizados
    let sucursalUpdate = {
        idSucursal: req.params.idSucursal,
        plaza: req.body.plaza,
        ciudad: req.body.ciudad
    }
    // actualizo la sucursal en la base de datos
    SucursalModel.updateSucursal(sucursalUpdate, error => {
        (error) ? ( // si hubo error
            Utilidad.printError({ msg: `Error al actualizar sucursal: ${error}`, tipo: 0 })
        ) : ( // si no hubo error
            res.redirect('/sucursales')
        )
    })
}

// pendiente, no se como eliminar por cascada, aun
function sucursalesIdSucursalDelete(req, res) {

}

module.exports = {
    sucursalesGet,
    sucursalesNewGet,
    sucursalesNewPost,
    sucursalesIdSucursalGet,
    sucursalesIdSucursalPut,
    sucursalesIdSucursalDelete
}