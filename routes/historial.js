/**
 * Created by Raul Perez on 21/04/2017.
 */
'use strict'

const express = require("express"),
    HistorialController = require('../controllers/historial'),
    historial = express.Router()

// gelishtime/historial/movimientos
// Metodo GET
historial.get("/movimientos", HistorialController.historialMovimientosGet)
// gelishtime/historial/bajas
// Metodo GET
historial.get("/bajas", HistorialController.historialBajasGet )
// gelishtime/historial/general
// Metodo GET
historial.get("/general", HistorialController.historialGeneralGet )
// gelishtime/historial/sucursal
// Metodo GET
historial.get("/sucursal", HistorialController.historialSucursalGet )
// gelishtime/historial/datosGeneral
// Metodo GET
historial.get("/datosGeneral", HistorialController.historialDatosGeneralGet )
// gelishtime/historial/datosSucursal
// Metodo GET
historial.get("/datosSucursal", HistorialController.historialDatosSucursalGet )

module.exports = historial;