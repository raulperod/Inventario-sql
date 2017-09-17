/**
 * Created by Raul Perez on 21/04/2017.
 */
'use strict'

const MovimientoModel = require('../models/movimiento'),
      BajaModel = require('../models/baja'),
      BasicoModel = require('../models/basico'),
      SucursalModel = require('../models/sucursal'),
      EstadisticaModel = require('../models/estadistica'),
      ProductoModel = require('../models/producto'),
      CategoriaModel = require('../models/categoria'),
      Utilidad = require('../ayuda/utilidad')

function historialMovimientosGet(req, res) {
    let usuario = req.session.user,
        idSucursal = usuario.idSucursal

    if( usuario.permisos === 1){ // si es administrador de sucursales
        CategoriaModel.getNamesOfCategories((error, categorias) => {
            (error) ? (
                Utilidad.printError(res, {msg:`Error al obtener las categorias: ${error}`,tipo: 0})
            ) : (
                res.render('./historial/movimientos',{ usuario, categorias })
            )
        })
    }else{ // si es administrador general
        CategoriaModel.getNamesOfCategories((error, categorias) => {
            (error) ? (
                Utilidad.printError(res, {msg:`Error al obtener las categorias: ${error}`,tipo: 0})
            ) : (
                SucursalModel.getPlazasOfSucursales((error, sucursales) => {
                    (error) ? (
                        Utilidad.printError(res, {msg:`Error al obtener las sucursales: ${error}`, tipo:0})
                    ) : (
                        res.render('./historial/movimientos',{ usuario, sucursales, categorias })
                    )
                })
            )
        })
    }
}

function historialMovimientosPost(req, res) {
    let usuario = req.session.user,
        inicio = req.body.inicio,
        final = sumarDia( req.body.final ),
        idSucursal = usuario.idSucursal,
        categoria = req.body.categoria,
        sucursal = (usuario.permisos === 1) ? null : req.body.plaza

    if( usuario.permisos === 1){ // si es administrador de sucursales
        MovimientoModel.getMovimientosNoBasicosByIdSucursalAndCategoria(idSucursal, categoria, inicio, final, (error, movimientos) => {
            if(error){
                Utilidad.printError(res, {msg:`Error al obtener los movimientos: ${error}`, tipo: 0}) 
            }else{
                MovimientoModel.getMovimientosBasicosByIdSucursalAndCategoria(idSucursal, categoria, inicio, final, (error, asignaciones) => {
                    (error) ? (
                        Utilidad.printError(res, {msg:`Error al obtener los movimientos: ${error}`, tipo: 0})
                    ) : (
                        res.send({movimientos, asignaciones})
                    )
                })
            }
        })
    }else{ // si es administrador general
        MovimientoModel.getMovimientosNoBasicosByPlazaAndCategoria(sucursal, categoria, inicio, final, (error, movimientos) => {
            if(error){
                Utilidad.printError(res, {msg:`Error al obtener los movimientos: ${error}`, tipo: 0}) 
            }else{
                MovimientoModel.getMovimientosBasicosByPlazaAndCategoria(sucursal, categoria, inicio, final, (error, asignaciones) => {
                    (error) ? (
                        Utilidad.printError(res, {msg:`Error al obtener los movimientos: ${error}`, tipo: 0})
                    ) : (
                        res.send({movimientos, asignaciones})
                    )
                })
            }
        })
    }
}

function historialBajasGet(req, res) {
    let usuario = req.session.user,
        idSucursal = usuario.idSucursal

    if( usuario.permisos === 1){ // si es administrador de sucursales
        // obtener los movimientos de productos basicos y no basicos de la sucursal
        BajaModel.getBajasNoBasicosBySucursal(idSucursal, (error, bajas) => {
            if(error){
                Utilidad.printError(res, {msg:`Error al obtener los movimientos: ${error}`, tipo: 0})
                return
            }
            BajaModel.getBajasBasicosBySucursal(idSucursal, (error, bajasBasicos) => {
                if(error){
                    Utilidad.printError(res, {msg:`Error al obtener los movimientos: ${error}`, tipo: 0})
                    return
                }
                // unir movimientos
                res.render('./historial/bajas',{usuario, bajas, bajasBasicos})
            })
        })
    }else{ // si es administrador general
        // obtener los movimientos de productos basicos y no basicos de todas las sucursales
        // obtener los movimientos de productos basicos y no basicos de la sucursal
        BajaModel.getBajasNoBasicos((error, bajas) => {
            if(error){
                Utilidad.printError(res, {msg:`Error al obtener los movimientos: ${error}`, tipo: 0})
                return
            }
            BajaModel.getBajasBasicos((error, bajasBasicos) => {
                if(error){
                    Utilidad.printError(res, {msg:`Error al obtener los movimientos: ${error}`, tipo: 0})
                    return
                }
                // unir movimientos
                res.render('./historial/bajas',{usuario, bajas, bajasBasicos})
            })
        })
    }
}

function historialSucursalGet(req, res) {
    ProductoModel.getProductsBasicos( (error, basicos) => {
        (error) ? (
            Utilidad.printError(res, {msg:`Error al obtener los productos basicos: ${error}` , tipo: 0})
        ) : (
            req.session.basicos = basicos,
            res.render('./historial/sucursal', { basicos, usuario: req.session.user} )
        )
    })
}

function historialSucursalTopPost(req, res) {
    // obtengo las fechas
    let inicio = req.body.iniciot,
        final = sumarDia( req.body.finalt ),
        idSucursal = req.session.user.idSucursal

    EstadisticaModel.getTopTen(idSucursal, inicio, final, (error, topten) => {
        if(!error){
            res.send(topten)
        }
    })
}

function historialSucursalBasicosPost(req, res) {
    // obtengo las fechas
    let inicio = req.body.iniciob,
        final = sumarDia( req.body.finalb ),
        idSucursal = req.session.user.idSucursal,
        codigoProducto = getCodigoByName(req.session.basicos, req.body.basico)

    // obtener el id del producto a comparar
    ProductoModel.getIdProductoByCode(codigoProducto,(error, producto) => {
        if(!error){
            EstadisticaModel.getComparacion(idSucursal, producto.idProducto, inicio, final, (error, comparacion) => {
                if(!error){
                    res.send(comparacion)
                }
            })
        }
    })
}

function historialGeneralGet(req, res) {
    SucursalModel.getPlazasOfSucursales((error, sucursales) => {
        if(error){
            Utilidad.printError(res, {msg:`Error al obtener las sucursales: ${error}` , tipo: 0})
            return
        }
        ProductoModel.getProductsBasicos( (error, basicos) => {
            (error) ? (
                Utilidad.printError(res, {msg:`Error al obtener los productos basicos: ${error}` , tipo: 0})
            ) : (
                req.session.basicos = basicos,
                res.render('./historial/general', {basicos, sucursales, usuario: req.session.user} )
            )
        })
    })
}

function historialGeneralTopPost(req, res) {
    // obtengo las fechas
    let inicio = req.body.iniciot,
        final = sumarDia( req.body.finalt ),
        sucursal = req.body.sucursaltop

    // busco la sucursal por el nombre de la plaza
    SucursalModel.getIdSucursalByPlaza(sucursal, (error, idSucursal) => {
        if(!error){
            EstadisticaModel.getTopTen(idSucursal, inicio, final, (error, topten) => {
                if(!error){
                    res.send(topten)
                }
            })
        }
    })
}

function historialGeneralBasicosPost(req, res) {
    // obtengo las fechas
    let inicio = req.body.iniciob,
        final = sumarDia( req.body.finalb ),
        sucursal = req.body.sucursalbas,
        codigoProducto = getCodigoByName(req.session.basicos, req.body.basico)

    SucursalModel.getIdSucursalByPlaza(sucursal, (error, idSucursal) => {
        if(!error){
            // obtener el id del producto a comparar
            ProductoModel.getIdProductoByCode(codigoProducto,(error, producto) => {
                if(!error) {
                    EstadisticaModel.getComparacion(idSucursal, producto.idProducto, inicio, final, (error, comparacion) => {
                        if(!error){
                            res.send(comparacion)
                        }
                    })
                }
            })
        }
    })
}

function sumarDia(fecha) {
    let nuevaFecha = fecha.split('-')
    let dia = parseInt( nuevaFecha[2] )
    dia++
    if ( dia < 10 ) dia = '0' + dia
    return  ( nuevaFecha[0] + '-' + nuevaFecha[1] + '-' + dia )
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

module.exports = {
    historialMovimientosGet,
    historialMovimientosPost,
    historialBajasGet,
    historialGeneralGet,
    historialSucursalGet,
    historialSucursalTopPost,
    historialSucursalBasicosPost,
    historialGeneralBasicosPost,
    historialGeneralTopPost
}