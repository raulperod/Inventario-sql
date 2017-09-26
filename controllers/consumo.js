/**
 * Created by Raul Perez on 21/04/2017.
 */
'use strict'

const AlmacenModel = require('../models/almacen'),
      BajaModel = require('../models/baja'),
      CategoryModel = require('../models/categoria'),
      SucursalModel = require('../models/sucursal'),
      Utilidad = require('../ayuda/utilidad')

function consumosGet(req, res) {
    let usuario = req.session.user

    if( usuario.permisos < 2){
        CategoryModel.getNamesOfCategories((error, categorias) => {
            if(!error){
                res.render('./consumos/manager', {usuario, categorias})
            }
        })
    }else{
        // muestra la vista de los productos en consumo
        SucursalModel.getPlazasOfSucursales((error, sucursales) => {
            if(!error){
                CategoryModel.getNamesOfCategories((error, categorias) => {
                    if(!error){
                        res.render('./consumos/manager', {usuario, sucursales, categorias})
                    }
                })
            }
        })
    }
}

function consumoPost(req, res){
    let usuario = req.session.user,
        categoria = req.body.categoria, // obtienes el nombre de la categoria
        sucursal = (usuario.permisos < 2) ? usuario.idSucursal : req.body.plaza    

    if( usuario.permisos === 2){ // si es administrador general
        // obtengo el consumo
        AlmacenModel.getConsumoByPlazaAndCategory( sucursal, categoria, (error, consumos) => {
            if(!error) res.send(consumos) // se envia el consumo con los productos de la caterogia seleccionada            
        })
    }else{ // si es administrador de sucursal o recepcionista
        // obtengo el consumo
        AlmacenModel.getConsumoBySucursalAndCategory( sucursal, categoria, (error, consumos) => {
            if(!error) res.send(consumos) // se envia el consumo con los productos de la caterogia seleccionada
        })
    }    
}

function consumosIdConsumoPut(req, res) {
    // obtenemos la cantidad
    let cantidad = parseInt(req.body.cantidad)
    // si no mandaron cambios
    if( isNaN(cantidad) || cantidad === 0 ){
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
                            idUsuario: usuario.idUsuario,
                            idProducto: almacen.idProducto,
                            cantidad: ( verificar ) ? ( almacen.cantidadConsumo ) : ( cantidad ),
                            fecha: fechaActual()
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

function fechaActual(){
    let fecha = new Date(); // obtengo la fecha actual
    fecha.setHours(fecha.getHours() - 7) // le resto 7 horas a la hora actual
    return fecha // regreso la fecha
}

module.exports = {
    consumosGet,
    consumosIdConsumoPut,
    consumoPost
}