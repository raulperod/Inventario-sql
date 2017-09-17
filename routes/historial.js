/**
 * Created by Raul Perez on 21/04/2017.
 */
'use strict'

const express = require("express"),
    HistorialController = require('../controllers/historial'),
    historial = express.Router()

// gelishtime/historial/movimientos
historial
    .route('/movimientos')
    .get( HistorialController.historialMovimientosGet )
    .post( HistorialController.historialMovimientosPost )
// gelishtime/historial/bajas
historial
    .route('/bajas')
    .get( HistorialController.historialBajasGet )
    .post( HistorialController.historialBajasPost )
// gelishtime/historial/general
// Metodo GET
historial.get("/general", HistorialController.historialGeneralGet )
// gelishtime/historial/sucursal
// Metodo GET
historial.get("/sucursal", HistorialController.historialSucursalGet )
// gelishtime/historial/sucursaltop
// Metodo POST
historial.post("/sucursaltop", HistorialController.historialSucursalTopPost )
// gelishtime/historial/sucursalbasicos
// Metodo POST
historial.post("/sucursalbas", HistorialController.historialSucursalBasicosPost )
// gelishtime/historial/generaltop
// Metodo POST
historial.post("/generaltop", HistorialController.historialGeneralTopPost )
// gelishtime/historial/generalbas
// Metodo POST
historial.post("/generalbas", HistorialController.historialGeneralBasicosPost )

module.exports = historial;