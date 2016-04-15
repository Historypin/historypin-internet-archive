'use strict';

/**
 * module variables
 */
var acceptedLanguages;

/**
 * module dependencies
 */
acceptedLanguages = require( 'node-accepted-languages' );

/**
 * @param {Function} app
 * @param {Function} app.use
 */
module.exports = function ( app ) {
  app.use( acceptedLanguages() );
};