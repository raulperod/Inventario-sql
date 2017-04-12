/**
 * Created by Raul Perez on 12/04/2017.
 */
'use strict'

const SucursalModel = require('../models/sucursal')

function sucursalesGet(req, res) {
    // defino la seleccion
    let seleccion = ['*'],
        usuario = req.session.user
    // busco las sucursales
    SucursalModel.getSucursales(seleccion, sucursales => { // si no hubo error
        res.render('./sucursales/manager', { sucursales, usuario })
    }, error => { // si hubo error
        console.log(`Error al obtener las sucursales: ${error}`)
        res.redirect('/error')
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
    SucursalModel.createSucursal(nuevaSucursal, () => { // si no hubo error
        res.redirect('/sucursales')
    }, error => { // si hubo error
        console.log(`Error al guardar la nueva sucursal: ${error}`)
        // mando una alerta que se repitio la plaza
        res.send('0')
    })
}

function sucursalesIdSucursalGet(req, res) {
    // declaro variables necesarias
    let idSucursal = req.params.idSucursal,
        usuario = req.session.user,
        seleccion = ['*']
    // busco la sucursal a editar
    SucursalModel.getSucursalById(idSucursal, seleccion, sucursalUpdate => { // si no hubo error
        res.render('./sucursales/update', {  usuario, sucursalUpdate: sucursalUpdate[0] })
    }, error => { // si hubo error
        console.log(`Error al obtener la sucursal: ${error}`)
        res.redirect('/error')
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
    SucursalModel.updateSucursal(sucursalUpdate, () => { // si no hubo error al actualizar
        res.redirect('/sucursales')
    }, error => { // si hubo un error
        console.log(`Error al actualizar sucursal: ${error}`)
        // mando una alerta que se repitio la plaza
        res.send('0')
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