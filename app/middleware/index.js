'use strict';

/**
 * module variables
 */
var path;

/**
 * module dependencies
 */
path = require( 'path' );

module.exports = function ( app ) {
  require( path.join( __dirname, 'compression' ) )( app );
  require( path.join( __dirname, 'logger' ) )( app );
  require( path.join( __dirname, 'body-parser' ) )( app );
  require( path.join( __dirname, 'cookie-parser' ) )( app );
  require( path.join( __dirname, 'csrf' ) )( app );
  require( path.join( __dirname, 'accepted-languages' ) )( app );
  require( path.join( __dirname, 'lang' ) )( app );
  require( path.join( __dirname, 'sass' ) )( app );
};