/**
 * Created by Raul Perez on 12/04/2017.
 */
'use strict'

const   SucursalModel = require('../models/sucursal'),
        ProductModel = require('../models/producto'),
        AlmacenModel = require('../models/almacen'),
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
        if(error){ // si hubo error
            Utilidad.printError(res, { msg: `Error al guardar la nueva sucursal, plaza repetida: ${error}`, tipo: 1})
        } else { // si no hubo error
            res.redirect('/sucursales')
            // genero los almacenes para la sucursal
            // con los productos existentes
            // busco el id de la sucursal que se acaba de crear
            SucursalModel.getIdSucursalByPlaza(nuevaSucursal.plaza, (error, idSucursal) => {
                (error) ? (
                    Utilidad.printError(res, {msg: `Error al buscar el id de la sucursal: ${error}`, tipo: 0})
                ) : (
                    generarAlmacenes(req, res, idSucursal)
                )
            })
        }
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
            Utilidad.printError(res, { msg: `Error al actualizar sucursal, plaza repetida: ${error}`, tipo: 1 })
        ) : ( // si no hubo error
            res.redirect('/sucursales')
        )
    })
}
// pendiente, no se como eliminar por cascada, aun
function sucursalesIdSucursalDelete(req, res) {

}

function generarAlmacenes(req, res, idSucursal){
    // busco todos los productos registrados
    ProductModel.getIdProductoAndIdCategoriaOfSucursales((error, productos) => {
        (error) ? (
            Utilidad.printError(res, {msg: `Error al obtener los ids de los productos: ${error}`, tipo: 0})
        ) : (
            productos.forEach(producto => generarAlmacen(req, res, idSucursal, producto))
        )
    })
}

function generarAlmacen(req, res, idSucursal, producto) {
    // genero un almacen, con la sucursal y el producto dado
    let nuevoAlmacen = {
        idProducto: producto.idProducto,
        idCategoria: producto.idCategoria,
        idSucursal
    }
    AlmacenModel.createAlmacen(nuevoAlmacen, error => {
        if(error) Utilidad.printError(res, {msg:`Error al crear el almacen: ${error}`, tipo: 1})
    })
}

module.exports = {
    sucursalesGet,
    sucursalesNewGet,
    sucursalesNewPost,
    sucursalesIdSucursalGet,
    sucursalesIdSucursalPut,
    sucursalesIdSucursalDelete
}