'use strict';

/**
 * modeule variables
 * @private
 */
var compression;

/**
 * module dependencies
 */
compression = require( 'compression' );

/**
 * @public
 * @param {Function} app
 */
module.exports = function ( app ) {
  app.use( compression() );
};