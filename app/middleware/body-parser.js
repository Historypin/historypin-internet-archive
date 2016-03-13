'use strict';

/**
 * module variables
 * @private
 */
var bodyParser;

/**
 * module dependencies
 */
bodyParser = require( 'body-parser' );

/**
 * @public
 * @param {Function} app
 */
module.exports = function ( app ) {
  app.use( bodyParser.json() );
  app.use( bodyParser.urlencoded( { extended: false } ) );
};
