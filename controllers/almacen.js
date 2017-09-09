/**
 * Created by Raul Perez on 21/04/2017.
 */
'use strict'

const AlmacenModel = require('../models/almacen'),
      MovimientoModel = require('../models/movimiento'),
      CategoryModel = require('../models/categoria'),
      SucursalModel = require('../models/sucursal'),
      Utilidad = require('../ayuda/utilidad')

function almacenGet(req, res) { 
    // muestra la vista del almacen
    SucursalModel.getPlazasOfSucursales((error, sucursales) => {
        if(!error){
            CategoryModel.getNamesOfCategories((error, categorias) => {
                if(!error){
                    res.render('./almacen/manager', {usuario: req.session.user, sucursales, categorias})
                }
            })
        }
    })
}

function almacenIdAlmacenAddPut(req, res) {
    // obtengo la cantidad
    let cantidad = parseInt(req.body.cantidad)
    // si no mandaron cambios
    if( cantidad === 0 ){
        res.send("") // no mando nada
    }else{ // si agregaron productos
        let usuario = req.session.user,
            idAlmacen = req.params.idAlmacen
        // busco el almacen
        AlmacenModel.getAlmacenById(idAlmacen, (error, almacen) => {
            if(error){ // si ocurrio un error
                Utilidad.printError(res, {msg:`Error al obtener el almacen: ${error}`, tipo: 0})
            } else { // si no paso nada malo
                // actualizo el almacen
                let almacenUpdate = {
                    idAlmacen,
                    cantidadAlmacen: almacen.cantidadAlmacen + cantidad
                }
                // guardo los cambios
                AlmacenModel.updateAlmacen(almacenUpdate, error => {
                    if(error){ // si hubo error
                        Utilidad.printError(res, {msg:`Error al actualizar el almacen: ${error}`, tipo: 0})
                    } else { // si no hubo error
                        // creo el movimiento
                        let movimiento = {
                            idSucursal: usuario.idSucursal,
                            idUsuario: usuario.idUsuario,
                            idProducto: almacen.idProducto,
                            idCategoria: almacen.idCategoria,
                            cantidad,
                            tipo: 1 // es una alta
                        }
                        // guardo el movimiento que ocurrio
                        MovimientoModel.createMovimientoNoBasico(movimiento, error => {
                            (error) ? ( // si hubo error
                                Utilidad.printError(res, {msg:`Error al crear el movimiento: ${error}`, tipo: 0})
                            ) : ( // si no hubo
                                // mando la nueva cantidad del almacen
                                res.send(''+almacenUpdate.cantidadAlmacen)
                            )
                        })
                    }
                })
            }
        })
    }
}

function almacenIdAlmacenSubPut(req, res) {
    // obtengo la cantidad
    let cantidad = parseInt(req.body.cantidad)
    // si no mandaron cambios
    if( cantidad === 0 ){
        res.send("") // no mando nada
    }else{ // si se quitaron productos
        let usuario = req.session.user,
            idAlmacen = req.params.idAlmacen

        // obtengo el almacen
        AlmacenModel.getConsumoById(idAlmacen, (error, almacen) => {
            if(error){ // si hubo error
                Utilidad.printError(res, {msg:`Error al obtener el almacen: ${error}`, tipo: 0})
            } else if(almacen.cantidadAlmacen === 0){ // si no hay nada en consumo
                res.send("")
            } else { // si no hubo error
                // genero los cambios
                let verificar = ( cantidad >= almacen.cantidadAlmacen ),
                    almacenUpdate = {
                        idAlmacen,
                        cantidadAlmacen: ( verificar ) ? ( 0 ) : ( almacen.cantidadAlmacen - cantidad ),
                        cantidadConsumo: ( verificar ) ? ( almacen.cantidadConsumo+almacen.cantidadAlmacen ) : ( almacen.cantidadConsumo+cantidad )
                    }
                // guardo los cambios
                AlmacenModel.updateAlmacen(almacenUpdate, error => {
                    if(error){
                        Utilidad.printError(res, {msg:`Error al actualizar el almacen: ${error}`, tipo: 0})
                    } else {
                        // creo el movimiento
                        let movimiento = {
                            idSucursal: usuario.idSucursal,
                            idUsuario: usuario.idUsuario,
                            idProducto: almacen.idProducto,
                            idCategoria: almacen.idCategoria,
                            cantidad: ( verificar ) ? ( almacen.cantidadAlmacen ) : ( cantidad ),
                            tipo: 0 // es una baja
                        }
                        // guardo el movimiento que ocurrio
                        MovimientoModel.createMovimientoNoBasico(movimiento, error => {
                            (error) ? ( // si hubo error
                                Utilidad.printError(res, {msg:`Error al crear el movimiento: ${error}`, tipo: 0})
                            ) : ( // si no hubo
                                // mando la nueva cantidad del almacen
                                (verificar) ? ( res.send('0') ) : ( res.send(`${almacenUpdate.cantidadAlmacen}`))
                            )
                        })
                    }
                })
            }
        })
    }
}

function almacenCategoryGet(req, res){
    let usuario = req.session.user,
        categoria = req.body.categoria, // obtienes el nombre de la categoria
        sucursal = (usuario.permisos < 2) ? usuario.idSucursal : req.body.plaza    

    if( usuario.permisos === 2){ // si es administrador general
        // obtengo el almacen
        AlmacenModel.getAlmacenByPlazaAndCategory( sucursal, categoria, (error, almacen) => {
            if(!error) res.send(almacen) // se envia el almacen con los productos de la caterogia seleccionada
        })
    }else{ // si es administrador de sucursal o recepcionista
        // obtengo el almacen
        AlmacenModel.getAlmacenBySucursalAndCategory( sucursal, categoria, (error, almacen) => {
            if(!error) res.send(almacen) // se envia el almacen con los productos de la caterogia seleccionada
        })
    }
}

module.exports = {
    almacenGet,
    almacenIdAlmacenAddPut,
    almacenIdAlmacenSubPut,
    almacenCategoryGet
}