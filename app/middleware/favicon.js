'use strict';

/**
 * module variables
 * @private
 */
var favicon;
var path;

/**
 * variables assignments
 */
favicon = require( 'serve-favicon' );
path = require( 'path' );

/**
 * @public
 * @param {Function} app
 */
module.exports = function ( app ) {
  app.use( favicon( path.join( __dirname, '..', '..', 'public', 'favicon.ico' ) ) );
};