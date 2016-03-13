'use strict';

/**
 * module variables
 */
var config;
var path;

/**
 * variable assignments
 */
path = require( 'path' );

if ( process.env.NODE_ENV.toString().toLowerCase() === 'development' ) {
  config = require( path.join( __dirname, 'development' ) );
} else {
  config = require( path.join( __dirname, 'production' ) );
}

module.exports = config;