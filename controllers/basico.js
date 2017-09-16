/**
 * Created by Raul Perez on 21/04/2017.
 */
'use strict'

const ProductoModel = require("../models/producto"),
      AlmacenModel = require("../models/almacen"),
      MovimientoModel = require("../models/movimiento"),
      BajaModel = require("../models/baja"),
      TecnicaModel = require("../models/tecnica"),
      BasicoModel = require("../models/basico"),
      Utilidad = require('../ayuda/utilidad')

function basicosGet(req, res) {
    let usuario = req.session.user
    // busco las tecnicas de la sucursal del usuario
    TecnicaModel.getTecnicasNameBySucursal(usuario.idSucursal, (error, tecnicas) => {
        if(error){ // si hubo error
            Utilidad.printError(res, {msg:`Error al obtener las tecnicas: ${error}`, tipo: 0})
        }else{
            ProductoModel.getProductsBasicos( (error, productos) =>{
                (error) ? ( // si hubo error
                    Utilidad.printError(res, {msg:`Error al obtener los productos: ${error}`, tipo: 0})
                ) : ( // no hubo error
                    req.session.productos = productos,
                    res.render("./basicos/manager",{ usuario, tecnicas ,productos })
                )
            })
        }
    })
}

function basicosPut(req, res) {
    // si se le asigna un producto
    let usuario = req.session.user,
        codigoProducto = getCodigoByName(req.session.productos ,req.body.producto),
        nombreTecnica = req.body.tecnica,
        almacen = null,
        idTecnica = null,
        idProducto = null,
        promesa = new Promise((resolve, reject) =>{
            // busco el id de la tecnica
            TecnicaModel.getIdTecnicaByFullNameAndIdSucursal(nombreTecnica, usuario.idSucursal,(error, idTecnica) => {
                return(error) ? ( reject({msg:`Error al obtener el id de la tecnica: ${error}`, tipo: 0}) ) : ( resolve(idTecnica) )
            })
        })

    // sigo con las promesas
    promesa
            // busco el id del producto
            .then(resolved => {
                idTecnica = resolved
                return new Promise((resolve, reject) => {
                    ProductoModel.getIdProductoByCode(codigoProducto, (error, producto) => {
                        return(error) ? ( reject({msg:`Error al obtener el id del producto: ${error}`, tipo: 0}) ) : ( resolve(producto) )
                    })
                })
            })
            // busco el 'basico en uso' del producto con el id del producto y el id de la tecnica
            .then(resolved => {
                idProducto = resolved.idProducto
                return new Promise((resolve, reject) => {
                    BasicoModel.getBasicoByProductAndTecnica(idProducto, idTecnica, (error, basico) => {
                        return(error) ? ( reject({msg:`Error al obtener el basico: ${error}`, tipo: 0}) ) : ( resolve(basico) )
                    })
                })
            })
            .then(resolved => {
                return new Promise((resolve, reject) => {
                    if(resolved.enUso){
                        // mandar alerta que esta en uso
                        reject({msg:`Error el producto esta en uso`, tipo: 11})
                    } else {
                        // busco el almacen para poder comprobar si tiene productos
                        AlmacenModel.getAlmacenBySucursalAndProduct(usuario.idSucursal, idProducto, (error, almacen) => {
                            return(error) ? ( reject({msg:`Error al obtener el almacen: ${error}`, tipo: 0}) ) : ( resolve(almacen) )
                        })
                    }
                })
            })
            .then(resolved => {
                almacen = resolved
                return new Promise((resolve, reject) => {
                    if(almacen.cantidadAlmacen > 0){
                        // se hacen los cambios necesarios
                        almacen.cantidadAlmacen--
                        almacen.cantidadConsumo++
                        AlmacenModel.updateAlmacen(almacen, error => {
                            return(error) ? ( reject({msg:`Error al actualizar el almacen: ${error}`,tipo: 0}) ) : (resolve(true))
                        })
                    } else {
                        // se manda una alerta de que no hay productos
                        reject({msg:`Error no hay productos disponibles`, tipo: 12})
                    }
                })
            })
            .then(resolved => {
                return new Promise((resolve, reject) => {
                    // se genera el movimiento
                    let movimiento = {
                        idUsuario: usuario.idUsuario,
                        idTecnica,
                        idProducto,
                        fecha: fechaActual()
                    }
                    MovimientoModel.createMovimientoBasico(movimiento, error => {
                        return(error) ? ( reject({msg:`Error al crear el movimiento: ${error}`,tipo: 0}) ) : ( resolve(true) )
                    })
                })
            })
            .then(resolved => {
                return new Promise((resolve, reject) => {
                    // se actualiza el basico de la tecnica
                    let basico = {
                        idTecnica,
                        idProducto,
                        enUso: true
                    }
                    BasicoModel.updateBasico(basico, error => {
                        return(error) ? (reject({msg:`Error al actualizar el basico: ${error}`,tipo: 0})) : (resolve(true))
                    })
                })
            })
            .then(resolved => {
                // se asigno correctamente y se manda una alerta
                res.send({msg:`Producto asignado correctamente`, tipo: 13})
            })
            .catch(error => {
                Utilidad.printError(res, error)
            })
}

function basicosDelete(req, res) {
    // si se le asigna un producto
    let usuario = req.session.user,
        codigoProducto = getCodigoByName(req.session.productos ,req.body.producto),
        nombreTecnica = req.body.tecnica,
        almacen = null,
        idTecnica = null,
        idProducto = null,
        promesa = new Promise((resolve, reject) =>{
            // busco el id de la tecnica
            TecnicaModel.getIdTecnicaByFullNameAndIdSucursal(nombreTecnica, usuario.idSucursal,(error, idTecnica) => {
                return(error) ? ( reject({msg:`Error al obtener el id de la tecnica: ${error}`, tipo: 0}) ) : ( resolve(idTecnica) )
            })
        })

    // sigo con las promesas
    promesa
    // busco el id del producto
        .then(resolved => {
            idTecnica = resolved
            return new Promise((resolve, reject) => {
                ProductoModel.getIdProductoByCode(codigoProducto,(error, producto) => {
                    return(error) ? ( reject({msg:`Error al obtener el id del producto: ${error}`, tipo: 0}) ) : ( resolve(producto) )
                })
            })
        })
        // busco el 'basico en uso' del producto con el id del producto y el id de la tecnica
        .then(resolved => {
            idProducto = resolved.idProducto
            return new Promise((resolve, reject) => {
                BasicoModel.getBasicoByProductAndTecnica(idProducto, idTecnica, (error, basico) => {
                    return(error) ? ( reject({msg:`Error al obtener el basico: ${error}`, tipo: 0}) ) : ( resolve(basico) )
                })
            })
        })
        .then(resolved => {
            return new Promise((resolve, reject) => {
                if(resolved.enUso){
                    // busco el almacen para poder comprobar si tiene productos
                    AlmacenModel.getAlmacenBySucursalAndProduct(usuario.idSucursal, idProducto, (error, almacen) => {
                        return(error) ? ( reject({msg:`Error al obtener el almacen: ${error}`, tipo: 0}) ) : ( resolve(almacen) )
                    })
                } else {
                    // mandar alerta que esta en uso
                    reject({msg:`Error el producto no esta en uso`, tipo: 21})
                }
            })
        })
        .then(resolved => {
            almacen = resolved
            return new Promise((resolve, reject) => {
                // se hacen los cambios necesarios
                almacen.cantidadConsumo--
                AlmacenModel.updateAlmacen(almacen, error => {
                    return(error) ? ( reject({msg:`Error al actualizar el almacen: ${error}`,tipo: 0}) ) : (resolve(true))
                })
            })
        })
        .then(resolved => {
            return new Promise((resolve, reject) => {
                // se genera el movimiento
                let baja = {
                    idUsuario: usuario.idUsuario,
                    idTecnica,
                    idProducto,
                    fecha: fechaActual()
                }
                BajaModel.createBajaBasico(baja, error => {
                    return(error) ? ( reject({msg:`Error al crear la baja: ${error}`,tipo: 0}) ) : ( resolve(true) )
                })
            })
        })
        .then(resolved => {
            return new Promise((resolve, reject) => {
                // se actualiza el basico de la tecnica
                let basico = {
                    idTecnica,
                    idProducto,
                    enUso: false
                }
                BasicoModel.updateBasico(basico, error => {
                    return(error) ? (reject({msg:`Error al actualizar el basico: ${error}`,tipo: 0})) : (resolve(true))
                })
            })
        })
        .then(resolved => {
            // se asigno correctamente y se manda una alerta
            res.send({msg:`Baja realizada correctamente`, tipo: 23})
        })
        .catch(error => {
            Utilidad.printError(res, error)
        })
}

function getCodigoByName(basicos, nombre){
    let productos = basicos,
        longitud = productos.length,
        codigo = null
    // busca el codigo del producto
    for(let i = 0; i < longitud ; i++){
        let producto = productos[i]
        if(producto.nombre === nombre){
            codigo = producto.codigo // obtengo el codigo del producto basico
            i = longitud // termino el ciclo
        }
    }

    return codigo
}

function fechaActual(){
    let fecha = new Date(); // obtengo la fecha actual
    fecha.setHours(fecha.getHours() - 7) // le resto 7 horas a la hora actual
    return fecha // regreso la fecha
}

module.exports = {
    basicosGet,
    basicosPut,
    basicosDelete
}