/**
 * Created by Raul Perez on 11/04/2017.
 */
'use strict'

const mysql = require('mysql'),
    dbOptions = require('./config'),
    myConnection = mysql.createConnection(dbOptions)

myConnection.connect( err => {
    return (err) ? console.log('Error al conectarse a mysql: '+err.stack) : console.log('Coneccion establecida con mysql')
})

module.exports = myConnection