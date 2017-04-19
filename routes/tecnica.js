/**
 * Created by Raul Perez on 12/04/2017.
 */
'use strict'

const express = require('express'),
    TecnicaController = require('../controllers/tecnica'),
    tecnica = express.Router()

tecnica
    .get('/', TecnicaController.tecnicasGet )

tecnica
    .route('/new')
    .get( TecnicaController.tecnicasNewGet )
    .post( TecnicaController.tecnicasNewPost )

tecnica
    .route('/:idTecnica')
    .get( TecnicaController.tecnicasIdTecnicaGet )
    .put( TecnicaController.tecnicasIdTecnicaPut )

module.exports = tecnica