/**
 * Created by Raul Perez on 21/04/2017.
 */
'use strict'

const express = require("express"),
    AlmacenController = require('../controllers/almacen'),
    almacen = express.Router()

// gelishtime/almacen
almacen.get("/", AlmacenController.almacenGet )
// gelishtime/new
almacen.route("/new")
// Metodo GET
    .get( AlmacenController.almacenNewGet )
    // Metodo POST
    .post( AlmacenController.almacenNewPost )
// gelishtime/almacen/:idAlmacen/add
almacen.put('/:idAlmacen/add' , AlmacenController.almacenIdAlmacenAddPut )
// gelishtime/almacen/:idAlmacen/sub
almacen.put('/:idAlmacen/sub' , AlmacenController.almacenIdAlmacenSubPut )

module.exports = almacen