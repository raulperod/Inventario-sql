/**
 * Created by Raul Perez on 11/04/2017.
 */
'use strict'

const UserModel = require('../models/user'),
      SucursalModel = require('../models/sucursal')

function usersGet(req, res) {
    const usuario = req.session.user
    // verifica que tipo de usuario es
    if( usuario.permisos === 2 ){  // si es admin general
        const seleccion = ['*'] // pongo la seleccion que hara
        UserModel.getUsers( seleccion ,usuarios => { // si se pudieron obtener los usuarios
            res.render('./users/manager', { usuarios, usuario } )
        }, error => { // si hubo un error
            console.log(`Error al obtener los usuarios: ${error}`)
            res.redirect('/almacen')
        })
    } else { // si es admin de sucursal
        const idSucursal = req.session.user.idSucursal, // obtienes el id de la sucursal del usuario
              seleccion = ['username','password','nombre','apellido','permisos','status'] // pongo la seleccion que hara
        UserModel.getUsersBySucursal(idSucursal, seleccion ,usuarios => { // si se pudieron obtener los usuarios
            res.render('./users/manager', { usuarios, usuario } )
        }, error => { // si hubo un error
            console.log(`Error al obtener los usuarios: ${error}`)
            res.redirect('/almacen')
        })
    }
}

function usersNewGet(req, res) {
    const usuario = req.session.user
    if( usuario.permisos === 2 ){ // si es admin general
        const seleccion = ['plaza']
        SucursalModel.getSucursales(seleccion, sucursales => { // si se pudo obtener las sucursales
            res.render('./users/new', { sucursales, usuario })
        }, error => { // si ocurrio un error
            console.log(`Error no se pudieron obtener las sucursales: ${error}`)
        })
    } else { // si es admin general
        res.render('./users/new',{ usuario })
    }
}

function usersNewPost(req, res) {

}

function usersIdUsuarioGet() {
    
}

function usersIdUsuarioPut() {

}

module.exports = {
    usersGet,
    usersNewGet,
    usersNewPost,
    usersIdUsuarioGet,
    usersIdUsuarioPut
}