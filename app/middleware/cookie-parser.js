'use strict';

/**
 * module variables
 * @private
 */
var config;
var cookieParser;
var cookieSession;
var path;

/**
 * variable assignments
 */
path = require( 'path' );
config = require( path.join( __dirname, '..', 'config' ) );
cookieParser = require( 'cookie-parser' );
cookieSession = require( 'cookie-session' );

/**
 * @public
 * @param {Function} app
 */
module.exports = function ( app ) {
  app.use( cookieParser() );

  app.use(
    cookieSession( {
      expires: config.cookie.expires,
      maxAge: config.cookie.maxAge,
      keys: config.cookie.keys
    } )
  );
};