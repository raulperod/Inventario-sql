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
historial.post("/datosGeneral", HistorialController.historialDatosGeneralPost )
// gelishtime/historial/sucursaltop
// Metodo POST
historial.post("/sucursaltop", HistorialController.historialSucursalTopPost )
// gelishtime/historial/sucursalbasicos
// Metodo POST
historial.post("/sucursalbasicos", HistorialController.historialSucursalBasicosPost )

module.exports = historial;