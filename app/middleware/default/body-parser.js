'use strict';

/**
 * module dependencies
 */
var bodyParser = require( 'body-parser' );

/**
 * @param {Function} app
 * @param {Function} app.use
 *
 * @returns {undefined}
 */
function middleware( app ) {
  app.use( bodyParser.json() );
  app.use( bodyParser.urlencoded( { extended: false } ) );
}

module.exports = middleware;
