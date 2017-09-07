/**
 * Created by Raul Perez on 11/04/2017.
 */
'use strict'

const mysql = require('mysql'),
    //dbOptions = require('./config'),
    //myConnection = mysql.createConnection(dbOptions)
    myConnection = mysql.createConnection("mysql://qb2yr0gn8r62bymy:u7z3xtyqvh8r3ro0@ffn96u87j5ogvehy.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/plibo3i14bhoyzc6")

myConnection.connect( err => {
    return (err) ? console.log('Error al conectarse a mysql: '+err.stack) : console.log('Coneccion establecida con mysql')
})

module.exports = myConnection