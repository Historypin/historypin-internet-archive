'use strict';

/**
 * modeule variables
 * @private
 */
var csrf;

/**
 * module dependencies
 */
csrf = require( 'csurf' );

/**
 * @public
 * @param {Function} app
 */
module.exports = function ( app ) {
  app.use( csrf( { cookie: true } ) );
};