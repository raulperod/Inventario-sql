/**
 * Created by Raul Perez on 12/04/2017.
 */
'use strict'

const TecnicaModel = require('../models/tecnica'),
      SucursalModel = require('../models/sucursal')

function tecnicasGet(req, res) {
    let usuario = req.session.user
    if( usuario.permisos === 2 ){ // si es administrador general
        // busco todas las tecnicas
        TecnicaModel.getTecnicas( tecnicas => { // si no hubo error
            res.render('./tecnicas/manager', { usuario, tecnicas } )
        }, error => { // si hubo error
            console.log(`Error al obtener las tecnicas: ${error}`)
            res.json({ msg: `Error al obtener las tecnicas: ${error}`, tipo: 0 })
        })
    } else { // si es administrador de sucursal
        // busco todas las tecnicas
        TecnicaModel.getTecnicasBySucursal(usuario.idSucursal, tecnicas => { // si no hubo error
            res.render('./tecnicas/manager', { usuario, tecnicas } )
        }, error => { // si hubo error
            console.log(`Error al obtener las tecnicas: ${error}`)
            res.json({ msg: `Error al obtener las tecnicas: ${error}`, tipo: 0 })
        })
    }
}

function tecnicasNewGet(req, res) {
    let usuario = req.session.user
    if( usuario.permisos === 2 ){ // si es administrador general
        // busco las sucursales
        SucursalModel.getPlazasOfSucursales( sucursales => { // si no hubo error
            res.render('./tecnicas/new', { usuario, sucursales })
        }, error => { // si hubo error
            console.log(`Error al buscar las sucursales: ${error}`)
            res.json({ msg: `Error al buscar las sucursales: ${error}`, tipo: 0})
        })
    } else { // si es administrador de sucursal
        res.render('./tecnicas/new', { usuario })
    }
}

function tecnicasNewPost(req, res) {
    let usuario = req.session.user
    if( usuario.permisos === 2 ){ // si es administrador general
        let plaza = req.body.plaza
        // busco la sucursal
        SucursalModel.getIdSucursalByPlaza(plaza, idSucursal => { // si no hubo error
            // creamos la nueva tecnica
            let nuevaTecnia = {
                nombre: req.body.name,
                apellido: req.body.last_name,
                idSucursal
            }
            // guardamos a la nueva tecnica
            TecnicaModel.createTecnica(nuevaTecnia, () => {
                res.redirect('/tecnicas')
            }, error => {
                console.log(`Error al guardar la nueva tecnica: ${error}`)
                res.json({ msg: `Error al guardar la nueva tecnica: ${error}`, tipo: 0})
            })
        }, error => { // si hubo error
            console.log(`Error al buscar la sucursal: ${error}`)
            res.json({ msg: `Error al buscar la sucursal: ${error}`, tipo: 0})
        })
    } else { // si es administrador de sucursal
        // creamos la nueva tecnica
        let nuevaTecnia = {
            nombre: req.body.name,
            apellido: req.body.last_name,
            idSucursal: usuario.idSucursal
        }
        // guardamos a la nueva tecnica
        TecnicaModel.createTecnica(nuevaTecnia, () => {
            res.redirect('/tecnicas')
        }, error => {
            console.log(`Error al guardar la nueva tecnica: ${error}`)
            res.json({ msg: `Error al guardar la nueva tecnica: ${error}`, tipo: 0})
        })
    }
}

function tecnicasIdTecnicaGet(req, res) {
    let usuario = req.session.user,
        idTecnica = req.params.idTecnica

    if( usuario.permisos === 2 ){ // si es administrador general
        // busco las sucurales
        SucursalModel.getPlazasOfSucursales( sucursales => { // si no hubo error
            // busco la tecnica a editar
            TecnicaModel.getTecnicaById(idTecnica, tecnicaUpdate => { // si no hubo error
                res.render('./tecnicas/update', { usuario, sucursales, tecnicaUpdate: tecnicaUpdate[0] })
            }, error => { // si ocurrio un error
                console.log(`Error al obtener la tecnica: ${error}`)
                res.json({ msg: `Error al obtener la tecnica: ${error}`, tipo: 0})
            })
        }, error => { // si hubo error
            console.log(`Error al obtener las sucursales: ${error}`)
            res.json({ msg: `Error al obtener las sucursales: ${error}`, tipo: 0})
        })
    } else { // si es administrador de sucursal
        // busco la tecnica a editar
        TecnicaModel.getTecnicaById(idTecnica, tecnicaUpdate => { // si no hubo error
            res.render('./tecnicas/update', { usuario, tecnicaUpdate: tecnicaUpdate[0] })
        }, error => { // si ocurrio un error
            console.log(`Error al obtener la tecnica: ${error}`)
            res.json({ msg: `Error al obtener la tecnica: ${error}`, tipo: 0})
        })
    }
}

function tecnicasIdTecnicaPut(req, res) {
    let usuario = req.session.user,
        idTecnica = req.params.idTecnica

    if( usuario.permisos === 2 ){ // si es administrador general
        let plaza = req.body.plaza
        // busco las sucurales
        SucursalModel.getIdSucursalByPlaza(plaza, idSucursal => { // si no hubo error
            // edito la tecnica
            let tecnicaUpdate = {
                idTecnica,
                nombre: req.body.name,
                apellido: req.body.last_name,
                idSucursal
            }
            // actualizo la tecnica en la base de datos
            TecnicaModel.updateTecnica(tecnicaUpdate, () => { // si no hubo error
                res.redirect('/tecnicas')
            }, error => { // si hubo error
                console.log(`Error al actualizar tecnica: ${error}`)
                res.redirect({ msg: `Error al actualizar tecnica: ${error}`, tipo: 0})
            })
        }, error => { // si hubo error
            console.log(`Error al obtener las sucursales: ${error}`)
            res.redirect({ msg: `Error al obtener las sucursales: ${error}`, tipo: 0})
        })
    } else { // si es administrador de sucursal
        // edito la tecnica
        let tecnicaUpdate = {
            idTecnica,
            nombre: req.body.name,
            apellido: req.body.last_name,
            idSucursal: usuario.idSucursal
        }
        // actualizo la tecnica en la base de datos
        TecnicaModel.updateTecnica(tecnicaUpdate, () => { // si no hubo error
            res.redirect('/tecnicas')
        }, error => { // si hubo error
            console.log(`Error al actualizar tecnica: ${error}`)
            res.redirect({ msg: `Error al actualizar tecnica: ${error}`, tipo: 0})
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