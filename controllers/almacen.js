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
        AlmacenModel.getAlmacen((error, almacen) => {
            (error) ? (
                Utilidad.printError(res, {msg: `Error al obtener el almacen: ${error}`, tipo: 0})
            ) : (
                res.render('./almacen/manager', { usuario, almacen})
            )
        })
    }else{ // si es administrador de sucursal o recepcionista
        // obtengo el almacen
        AlmacenModel.getAlmacenBySucursal(usuario.idSucursal, (error, almacen) => {
            (error) ? (
                Utilidad.printError(res, {msg: `Error al obtener el almacen: ${error}`, tipo: 0})
            ) : (
                res.render('./almacen/manager', { usuario, almacen})
            )
        })
    }
}

function almacenIdAlmacenAddPut(req, res) {
// si no mandaron cambios
    if( parseInt(req.body.cantidad) === 0 ){
        res.send("") // no mando nada
    }else{
        let usuario = req.session.user
        // si no mandaron 0
        Almacen.findById(req.params.idAlmacen).exec( (err, productoAlm ) => { // busco el almacen
            if(!err && productoAlm){ // si no hay error y el almacen existe
                res.locals.productoAlmUpdate = productoAlm
                res.locals.productoAlmUpdate.cantidad += parseInt(req.body.cantidad)
                // genera el registro
                // creo la fecha
                let fecha = new Date()
                fecha.setHours(fecha.getHours()-7)
                let registro = new RegistroDeMovimiento({
                    sucursal: usuario.sucursal,
                    usuario:  usuario._id,
                    cantidad: parseInt(req.body.cantidad),
                    producto: productoAlm.producto,
                    tipo: 1,
                    fecha
                })
                // guarda al producto en la base de datos
                res.locals.productoAlmUpdate.save( err => {
                    if(err) console.log(err)
                })
                // guarda el registro
                registro.save().then( reg => {
                    // mando la nueva cantidad a mostrar
                    res.send(""+res.locals.productoAlmUpdate.cantidad)
                }, err => { // si ocurre un error lo imprime
                    console.log(err)
                })
            }else{
                if(err) console.log(err)
                res.redirect("/almacen")
            }
        })
    }
}

function almacenIdAlmacenSubPut(req, res) {

}

module.exports = {
    almacenGet,
    almacenIdAlmacenAddPut,
    almacenIdAlmacenSubPut
}