'use strict';

/**
 * module variables
 * @private
 */
var errorHandlers;
var express;
var middleware;
var path;
var routes;

/**
 * module variables
 * @public
 */
var app;

/**
 * variable assignments
 */
path = require( 'path' );
errorHandlers = require( path.join( __dirname, 'app', 'middleware', 'error-handlers' ) );
express = require( 'express' );
middleware = require( path.join( __dirname, 'app', 'middleware' ) );
routes = require( path.join( __dirname, 'app', 'routes' ) );

/**
 * create the app
 */
app = express();

/**
 * view engine
 */
app.set( 'views', path.join( __dirname, 'app', 'views' ) );
app.set( 'view engine', 'hjs' );

/**
 * middleware
 */
middleware( app );

/**
 * routes
 */
routes( app );

/**
 * error handlers
 * must come after routes
 */
errorHandlers( app );

module.exports = app;