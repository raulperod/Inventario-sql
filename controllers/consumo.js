/**
 * Created by Raul Perez on 21/04/2017.
 */
'use strict'

const AlmacenModel = require('../models/almacen'),
      BajaModel = require('../models/baja'),
      Utilidad = require('../ayuda/utilidad')

function consumosGet(req, res) {
    // muestra la vista de los productos en consumo
    res.render('./consumos/manager', {usuario: req.session.user})
}

function consumosIdConsumoPut(req, res) {
    // obtenemos la cantidad
    let cantidad = parseInt(req.body.cantidad)
    // si no mandaron cambios
    if( cantidad === 0 ){
        res.send("")
    }else{ // quitamos lo productos de consumo
        let usuario = req.session.user,
            idAlmacen = req.params.idConsumo

        // obtengo el almacen
        AlmacenModel.getConsumoById(idAlmacen, (error, almacen) => {
            if(error){ // si hubo error
                Utilidad.printError(res, {msg:`Error al obtener el almacen: ${error}`, tipo: 0})
            } else if(almacen.cantidadConsumo === 0){ // si no hay nada en consumo
                res.send("")
            } else { // si no hubo error
                // genero los cambios
                let verificar = ( cantidad >= almacen.cantidadConsumo ),
                    almacenUpdate = {
                        idAlmacen,
                        cantidadConsumo: ( verificar ) ? ( 0 ) : ( almacen.cantidadConsumo - cantidad )
                    }
                // guardo los cambios
                AlmacenModel.updateAlmacen(almacenUpdate, error => {
                    if(error){
                        Utilidad.printError(res, {msg:`Error al actualizar el almacen: ${error}`, tipo: 0})
                    } else {
                        // creo el movimiento
                        let baja = {
                            idSucursal: usuario.idSucursal,
                            idUsuario: usuario.idUsuario,
                            idProducto: almacen.idProducto,
                            idCategoria: almacen.idCategoria,
                            cantidad: ( verificar ) ? ( almacen.cantidadConsumo ) : ( cantidad )
                        }
                        // guardo el movimiento que ocurrio
                        BajaModel.createBajaNoBasico(baja, error => {
                            (error) ? ( // si hubo error
                                Utilidad.printError(res, {msg:`Error al crear el movimiento: ${error}`, tipo: 0})
                            ) : ( // si no hubo
                                // mando la nueva cantidad del almacen
                                (verificar) ? ( res.send('0') ) : ( res.send(`${almacenUpdate.cantidadConsumo}`))
                            )
                        })
                    }
                })
            }
        })
    }
}

function consumoCategoryPost(req, res){
    let usuario = req.session.user,
    categoria = req.body.categoria, // obtienes el nombre de la categoria
    sucursal = (usuario.permisos < 2) ? usuario.idSucursal : req.body.plaza    

    if( usuario.permisos === 2){ // si es administrador general
        // obtengo el consumo
        AlmacenModel.getConsumoByPlazaAndCategory( sucursal, categoria, (error, consumos) => {
            (error) ? (
                Utilidad.printError(res, {msg: `Error al obtener el consumo: ${error}`, tipo: 0})
            ) : (
                res.send(consumos) // se envia el consumo con los productos de la caterogia seleccionada
            )
        })
    }else{ // si es administrador de sucursal o recepcionista
        // obtengo el consumo
        AlmacenModel.getConsumoBySucursalAndCategory( sucursal, categoria, (error, consumos) => {
            (error) ? (
                Utilidad.printError(res, {msg: `Error al obtener el consumo: ${error}`, tipo: 0})
            ) : (
                res.send(consumos) // se envia el consumo con los productos de la caterogia seleccionada
            )
        })
    }    
}

module.exports = {
    consumosGet,
    consumosIdConsumoPut,
    consumoCategoryPost
}