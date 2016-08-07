'use strict';

/**
 * module dependencies
 */
var fileExists = require( 'node-file-exists' );
var path = require( 'path' );
var lang = require( 'node-lang' );

/**
 * @param {Function} app
 * @param {Function} app.use
 */
module.exports = function langMiddleware( app ) {
  if ( !fileExists( path.join( __dirname, '..', 'config', 'languages.json' ) ) ) {
    throw new Error( 'langMiddleware(): the file [ ' + path.join( __dirname, '..', 'config', 'languages.json' ) + ' ] does not exist.' );
  }

  app.use( lang( { languages: require( path.join( __dirname, '..', 'config', 'languages' ) ) } ) );
};
