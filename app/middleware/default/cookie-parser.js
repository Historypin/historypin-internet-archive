'use strict';

/**
 * variable assignments
 */
var config = require( '../../config' );
var cookieParser = require( 'cookie-parser' );
var cookieSession = require( 'cookie-session' );

/**
 * @param {Function} app
 * @param {Function} app.use
 *
 * @returns {undefined}
 */
function middleware( app ) {
  var cookie_config = {
    expires: config.cookie.expires,
    keys: config.cookie.keys,
    maxAge: config.cookie.maxAge
  };

  app.use( cookieParser() );
  app.use( cookieSession( cookie_config ) );
}

module.exports = middleware;
