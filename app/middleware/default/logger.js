'use strict';

/**
 * module dependencies
 */
var config = require( '../../config' );
var logger = require( 'morgan' );

/**
 * @param {Function} app
 * @param {Function} app.use
 *
 * @returns {undefined}
 */
function middleware( app ) {
  var logger_config = [
    ':req[x-real-ip]',
    '[:date[clf]]',
    '":method :url HTTP/:http-version"',
    ':status',
    ':response-time ms',
    ':res[content-length]',
    '":referrer" ":user-agent"'
  ].join( ' ' );

  if ( !config.morgan_debug ) {
    return;
  }

  app.use( logger( logger_config ) );
}

module.exports = middleware;
