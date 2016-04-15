'use strict';

/**
 * module variables
 */
var helpers;
var lang;
var path;

/**
 * module dependencies
 */
path = require( 'path' );
helpers = require( 'node-helpers' );
lang = require( 'node-lang' );

/**
 * @param {Function} app
 * @param {Function} app.use
 */
module.exports = function langMiddleware( app ) {
  if ( !helpers.fileExists( path.join( __dirname, '..', 'config', 'languages.json' ) ) ) {
    throw new Error( 'langMiddleware(): the file [ ' + path.join( __dirname, '..', 'config', 'languages.json' ) + ' ] does not exist.' );
  }

  app.use( lang( { languages: require( path.join( __dirname, '..', 'config', 'languages' ) ) } ) );
};