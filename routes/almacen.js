/**
 * Created by Raul Perez on 21/04/2017.
 */
'use strict'

const express = require("express"),
    AlmacenController = require('../controllers/almacen'),
    almacen = express.Router()

// gelishtime/almacen
almacen
    .route("/")
    .get(  AlmacenController.almacenGet )
    .post( AlmacenController.almacenPost )
// gelishtime/almacen/:idAlmacen/add
almacen.put('/:idAlmacen/add' , AlmacenController.almacenIdAlmacenAddPut )
// gelishtime/almacen/:idAlmacen/sub
almacen.put('/:idAlmacen/sub' , AlmacenController.almacenIdAlmacenSubPut )
 
module.exports = almacen