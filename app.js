/**
 * Created by Raul Perez on 11/04/2017.
 */
'use strict'

const express = require('express'),
    bodyParser = require('body-parser'),
    pug = require('pug'),
    restFul = require('method-override')('_method'),
    config = require('./config'),
    Index = require('./controllers/index'),
    User_router = require('./routes/user'),
    Sucursal_router = require('./routes/sucursal'),
    Tecnica_router = require('./routes/tecnica'),
    publicDir = express.static( __dirname + '/public' ),
    viewDir = __dirname + '/views',
    cookieSession = require("cookie-session"),
    session_admin = require('./middleware/session-admin'),
    session_general_admin = require('./middleware/session-general-admin'),
    app = express()

app
    // configuracion app
    .set('views', viewDir)
    .set('view engine', 'pug')
    .set('port',config.PORT)
    // ejecutando middleware
    .use( publicDir)
    // parse application/json
    .use( bodyParser.json())
    // parse applicaction/x-www-form-urlencoded
    .use( bodyParser.urlencoded({extended:false}) )
    // para put y delete
    .use( restFul )
    .use(cookieSession({
        name: "session",
        keys: ["gelish","time"]
    }))
    // ejecuto el middleware enrutador
    .get('/', Index.index )
    .get('/login', Index.loginGet )
    .post('/login', Index.loginPost )
    .get('/logout', Index.logout )
    // para ruta de usuarios
    .use("/users", session_admin )
    .use('/users', User_router )
    .use("/tecnicas", session_admin )
    .use('/tecnicas', Tecnica_router )
    .use("/sucursales", session_general_admin )
    .use('/sucursales', Sucursal_router )
    // para error 404
    .use( Index.error404 )

module.exports = app