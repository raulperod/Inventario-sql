/**
 * Created by Raul Perez on 12/04/2017.
 */
'use strict'

const TecnicaModel = require('../models/tecnica'),
      SucursalModel = require('../models/sucursal')

function tecnicasGet(req, res) {
    let usuario = req.session.user
    if( usuario.permisos === 2 ){ // si es administrador general
        let seleccion = ['*']
        // busco todas las tecnicas
        TecnicaModel.getTecnicas(seleccion, tecnicas => { // si no hubo error
            res.render('./tecnicas/manager', { usuario, tecnicas } )
        }, error => { // si hubo error
            console.log(`Error al obtener las tecnicas: ${error}`)
            res.redirect('/almacen')
        })
    } else { // si es administrador de sucursal
        let seleccion = ['idTecnica','nombre','apellido']
        // busco todas las tecnicas
        TecnicaModel.getTecnicasBySucursal(usuario.idSucursal, seleccion, tecnicas => { // si no hubo error
            res.render('./tecnicas/manager', { usuario, tecnicas } )
        }, error => { // si hubo error
            console.log(`Error al obtener las tecnicas: ${error}`)
            res.redirect('/almacen')
        })
    }
}

function tecnicasNewGet(req, res) {
    let usuario = req.session.user
    if( usuario.permisos === 2 ){ // si es administrador general
        let seleccion = ['plaza']
        // busco las sucursales
        SucursalModel.getSucursales(seleccion, sucursales => { // si no hubo error
            res.render('./tecnicas/new', { usuario, sucursales })
        }, error => { // si hubo error
            console.log(`Error al buscar las sucursales: ${error}`)
            res.redirect('/almacen')
        })
    } else { // si es administrador de sucursal
        res.render('./tecnicas/new', { usuario })
    }
}

function tecnicasNewPost(req, res) {
    let usuario = req.session.user
    if( usuario.permisos === 2 ){ // si es administrador general
        let plaza = req.body.plaza,
            seleccion = ['idSucursal']
        // busco la sucursal
        SucursalModel.getSucursalByPlaza(plaza, seleccion, sucursal => { // si no hubo error
            // creamos la nueva tecnica
            let nuevaTecnia = {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                nombreCompleto: req.body.nombre+' '+req.body.apellido,
                sucursal: sucursal.idSucursal
            }
            // guardamos a la nueva tecnica
            TecnicaModel.createTecnica(nuevaTecnia, () => {
                res.redirect('/tecnicas')
            }, error => {
                console.log(`Error al guardar la nueva tecnica: ${error}`)
                res.redirect('/almacen')
            })
        }, error => { // si hubo error
            console.log(`Error al buscar la sucursal: ${error}`)
            res.redirect('/almacen')
        })
    } else { // si es administrador de sucursal
        // creamos la nueva tecnica
        let nuevaTecnia = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            nombreCompleto: req.body.nombre+' '+req.body.apellido,
            sucursal: usuario.idSucursal
        }
        // guardamos a la nueva tecnica
        TecnicaModel.createTecnica(nuevaTecnia, () => {
            res.redirect('/tecnicas')
        }, error => {
            console.log(`Error al guardar la nueva tecnica: ${error}`)
            res.redirect('/almacen')
        })
    }
}

function tecnicasIdTecnicaGet(req, res) {
    let usuario = req.session.user,
        idTecnica = req.params.idTecnica,
        seleccionT = ['*']

    if( usuario.permisos === 2 ){ // si es administrador general
        let seleccionS = ['plaza']
        // busco las sucurales
        SucursalModel.getSucursales(seleccionS, sucursales => { // si no hubo error
            // busco la tecnica a editar
            TecnicaModel.getTecnicaById(idTecnica, seleccionT, tecnicaUpdate => { // si no hubo error
                res.render('./tecnicas/update', { usuario, sucursales, tecnicaUpdate: tecnicaUpdate[0] })
            }, error => { // si ocurrio un error
                console.log(`Error al obtener la tecnica: ${error}`)
                res.redirect('/almacen')
            })
        }, error => { // si hubo error
            console.log(`Error al obtener las sucursales: ${error}`)
            res.redirect('/almacen')
        })
    } else { // si es administrador de sucursal
        // busco la tecnica a editar
        TecnicaModel.getTecnicaById(idTecnica, seleccionT, tecnicaUpdate => { // si no hubo error
            res.render('./tecnicas/update', { usuario, tecnicaUpdate: tecnicaUpdate[0] })
        }, error => { // si ocurrio un error
            console.log(`Error al obtener la tecnica: ${error}`)
            res.redirect('/almacen')
        })
    }
}

function tecnicasIdTecnicaPut(req, res) {
    let usuario = req.session.user,
        idTecnica = req.params.idTecnica

    if( usuario.permisos === 2 ){ // si es administrador general
        let seleccionS = ['idSucursal'],
            plaza = req.body.plaza
        // busco las sucurales
        SucursalModel.getSucursalByPlaza(plaza, seleccionS, sucursal => { // si no hubo error
            // edito la tecnica
            let tecnicaUpdate = {
                idTecnica,
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                nombreCompleto: req.body.nombre+' '+req.body.apellido,
                idSucursal: sucursal[0].idSucursal
            }
            // actualizo la tecnica en la base de datos
            TecnicaModel.updateTecnica(tecnicaUpdate, () => { // si no hubo error
                res.redirect('/tecnicas')
            }, error => { // si hubo error
                console.log(`Error al actualizar tecnica: ${error}`)
                res.redirect('/almacen')
            })
        }, error => { // si hubo error
            console.log(`Error al obtener las sucursales: ${error}`)
            res.redirect('/almacen')
        })
    } else { // si es administrador de sucursal
        // edito la tecnica
        let tecnicaUpdate = {
            idTecnica,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            nombreCompleto: req.body.nombre+' '+req.body.apellido,
            idSucursal: usuario.idSucursal
        }
        // actualizo la tecnica en la base de datos
        TecnicaModel.updateTecnica(tecnicaUpdate, () => { // si no hubo error
            res.redirect('/tecnicas')
        }, error => { // si hubo error
            console.log(`Error al actualizar tecnica: ${error}`)
            res.redirect('/almacen')
        })
    }
}

module.exports = {
    tecnicasGet,
    tecnicasNewGet,
    tecnicasNewPost,
    tecnicasIdTecnicaGet,
    tecnicasIdTecnicaPut
}