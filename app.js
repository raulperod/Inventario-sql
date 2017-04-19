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
    Category_router = require('./routes/category'),
    cookieSession = require("cookie-session"),
    session_admin = require('./middleware/session-admin'),
    session_general_admin = require('./middleware/session-general-admin'),
    app = express()

app
    // configuracion app
    .set("view engine","pug")
    .set('views', config.VIEWS)
    .set('port',config.PORT)
    // ejecutando middleware
    .use( config.PUBLIC, express.static('public') )
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
// indice
app
    .get('/', Index.index )
    .get('/login', Index.loginGet )
    .post('/login', Index.loginPost )
    .get('/logout', Index.logout )
    // para ruta de usuarios
app
    .use("/users", session_admin )
    .use('/users', User_router )
app
    .use("/tecnicas", session_admin )
    .use('/tecnicas', Tecnica_router )
app
    .use("/sucursales", session_general_admin )
    .use('/sucursales', Sucursal_router )
app
    .use("/categories", session_general_admin )
    .use('/categories', Category_router )
    // para error 404
    .use( Index.error404 )

module.exports = app