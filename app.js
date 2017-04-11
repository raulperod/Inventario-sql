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
    publicDir = express.static( __dirname + '/public' ),
    viewDir = __dirname + '/views',
    cookieSession = require("cookie-session"),
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
    //.post('/login', Index.loginPost )
    .get('/logout', Index.logout)
    .use('/users',User_router)

module.exports = app