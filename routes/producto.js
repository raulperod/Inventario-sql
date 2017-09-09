/**
 * Created by Raul Perez on 21/04/2017.
 */
'use strict'

const express = require("express"),
    ProductoController = require('../controllers/producto'),
    producto = express.Router()
// gelishtime/products
producto
    .get("/", ProductoController.productsGet)
producto
    .post('/:categoria/get', ProductoController.productsCategoriaGet)
// gelishtime/products/new
producto
    .route("/new")
    // Metodo GET
    .get( ProductoController.productsNewGet )
    // Metodo POST
    .post( ProductoController.productsNewPost )
// gelishtime/products/new
producto
    .route("/new/excel")
    // Metodo GET
    .get( ProductoController.excelGet )
    // Metodo POST
    .post( ProductoController.excelPost )
// gelishtime/products/:idProducto
producto
    .route("/:idProducto")
    // Metodo GET
    .get( ProductoController.productsIdProductoGet )
    // Metodo PUT
    .put( ProductoController.productsIdProductoPut )
    // Metodo DELETE
    .delete( ProductoController.productsIdProductoDelete )

module.exports = producto