/**
 * Created by Raul Perez on 21/04/2017.
 */
'use strict'

const express = require("express"),
    BasicoController = require('../controllers/basico'),
    basico = express.Router()

// gelishtime/basicos
basico
    .route("/")
    .get( BasicoController.basicosGet )
    .put( BasicoController.basicosPut )
    // Metodo DELETE
    .delete( BasicoController.basicosDelete )

module.exports = basico