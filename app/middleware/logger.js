'use strict';

/**
 * module variables
 */
var config;
var logger;
var path;

/**
 * variable assignments
 */
path = require( 'path' );
config = require( path.join( __dirname, '..', 'config' ) );
logger = require( 'morgan' );

/**
 * @param {Function} app
 * @param {Function} app.use
 */
module.exports = function ( app ) {
  var morgan_config;

  if ( !config.morgan_debug ) {
    return;
  }

  morgan_config =
    ':req[x-real-ip] ' +
    '[:date[clf]] ' +
    '":method :url HTTP/:http-version" ' +
    ':status ' +
    ':response-time ms ' +
    ':res[content-length] ' +
    '":referrer" ":user-agent"';

  app.use( logger( morgan_config ) );
};