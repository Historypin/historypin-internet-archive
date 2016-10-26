'use strict';

/**
 * module dependencies
 */
var errorHandlers = require( './app/middleware/error-handlers' );
var express = require( 'express' );
var middleware = require( './app/middleware/default' );
var routes = require( './app/routes' );

/**
 * create the app
 */
var app = express();

/**
 * view engine
 */
app.set( 'views', './app/views' );
app.set( 'view engine', 'hjs' );

/**
 * middleware
 */
middleware( app );

/**
 * routes
 */
routes( app, express );

/**
 * error handlers
 * must come after routes
 */
errorHandlers( app );

module.exports = app;
