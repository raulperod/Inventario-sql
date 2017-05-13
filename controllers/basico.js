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
                    res.render("./basicos/manager",{ usuario, tecnicas ,productos })
                )
            })
        }
    })
}

function basicosPut(req, res) {
    // si se le asigna un producto
    let usuario = req.session.user,
        nombreProducto = req.body.producto,
        nombreTecnica = req.body.tecnica,
        almacen = null,
        idTecnica = null,
        idProducto = null,
        idCategoria = null,
        promesa = new Promise((resolve, reject) =>{
            // busco el id de la tecnica
            TecnicaModel.getIdTecnicaByFullName(nombreTecnica,(error, idTecnica) => {
                return(error) ? ( reject({msg:`Error al obtener el id de la tecnica: ${error}`, tipo: 0}) ) : ( resolve(idTecnica) )
            })
        })

    // sigo con las promesas
    promesa
            // busco el id del producto
            .then(resolved => {
                idTecnica = resolved
                return new Promise((resolve, reject) => {
                    ProductoModel.getIdProductoAndIdCategoriaByName(nombreProducto,(error, producto) => {
                        return(error) ? ( reject({msg:`Error al obtener el id del producto: ${error}`, tipo: 0}) ) : ( resolve(producto) )
                    })
                })
            })
            // busco el 'basico en uso' del producto con el id del producto y el id de la tecnica
            .then(resolved => {
                idProducto = resolved.idProducto
                idCategoria = resolved.idCategoria
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
                        reject({msg:`Error el producto esta en uso`, tipo: 1})
                    } else {
                        // busco el almacen para poder comprobar si tiene productos
                        AlmacenModel.getAlmacenBySucursalAndProduct(usuario.idSucursal, idProducto, (error, almacen) => {
                            return(error) ? ( reject({msg:`Error al obtener el almacen: ${error}`, tipo: 1}) ) : ( resolve(almacen) )
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
                        reject({msg:`Error no hay productos disponibles`, tipo: 2})
                    }
                })
            })
            .then(resolved => {
                return new Promise((resolve, reject) => {
                    // se genera el movimiento
                    let movimiento = {
                        idSucursal: usuario.idSucursal,
                        idUsuario: usuario.idUsuario,
                        idTecnica,
                        idProducto,
                        idCategoria
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
                res.send({msg:`Producto asignado correctamente`, tipo: 3})
            })
            .catch(error => {
                Utilidad.printError(res, error)
            })
}

function basicosDelete(req, res) {
    // si se le asigna un producto
    let usuario = req.session.user,
        nombreProducto = req.body.producto,
        nombreTecnica = req.body.tecnica,
        almacen = null,
        idTecnica = null,
        idProducto = null,
        idCategoria = null,
        promesa = new Promise((resolve, reject) =>{
            // busco el id de la tecnica
            TecnicaModel.getIdTecnicaByFullName(nombreTecnica,(error, idTecnica) => {
                return(error) ? ( reject({msg:`Error al obtener el id de la tecnica: ${error}`, tipo: 0}) ) : ( resolve(idTecnica) )
            })
        })

    // sigo con las promesas
    promesa
    // busco el id del producto
        .then(resolved => {
            idTecnica = resolved
            return new Promise((resolve, reject) => {
                ProductoModel.getIdProductoAndIdCategoriaByName(nombreProducto,(error, producto) => {
                    return(error) ? ( reject({msg:`Error al obtener el id del producto: ${error}`, tipo: 0}) ) : ( resolve(producto) )
                })
            })
        })
        // busco el 'basico en uso' del producto con el id del producto y el id de la tecnica
        .then(resolved => {
            idProducto = resolved.idProducto
            idCategoria = resolved.idCategoria
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
                        return(error) ? ( reject({msg:`Error al obtener el almacen: ${error}`, tipo: 1}) ) : ( resolve(almacen) )
                    })
                } else {
                    // mandar alerta que esta en uso
                    reject({msg:`Error el producto no esta en uso`, tipo: 1})
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
                    idSucursal: usuario.idSucursal,
                    idUsuario: usuario.idUsuario,
                    idTecnica,
                    idProducto,
                    idCategoria
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
            res.send({msg:`Baja realizada correctamente`, tipo: 3})
        })
        .catch(error => {
            Utilidad.printError(res, error)
        })
}

module.exports = {
    basicosGet,
    basicosPut,
    basicosDelete
}