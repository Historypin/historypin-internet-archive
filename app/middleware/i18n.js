'use strict';

/**
 * module variables
 * @private
 */
var config;
var I18n;
var path;

/**
 * variable assignments dependencies
 */
path = require( 'path' );
config = require( path.join( __dirname, '..', 'config' ) );
I18n = require( 'i18n-2' );

/**
 * @public
 * @param {Function} app
 */
module.exports = function ( app ) {
  I18n.expressBind(
    app,
    {
      directory: path.join( __dirname, '..', 'locales' ),
      extension: '.json',
      locales: config.lang.available,
      indent: "  "
    }
  );
};