/**
 * Created by Raul Perez on 21/04/2017.
 */
'use strict'

const express = require("express"),
    ConsumoController = require('../controllers/consumo'),
    consumo = express.Router()

// gelishtime/consumos
consumo.get("/", ConsumoController.consumosGet )
// gelishtime/categoria/categoria/get
consumo.post('/', ConsumoController.consumoPost )
// gelishtime/consumos/:idConsumo
consumo.put("/:idConsumo", ConsumoController.consumosIdConsumoPut )

module.exports = consumo