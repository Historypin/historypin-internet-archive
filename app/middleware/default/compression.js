'use strict';

/**
 * module dependencies
 */
var compression = require( 'compression' );

/**
 * @param {Function} app
 * @param {Function} app.use
 *
 * @returns {undefined}
 */
function middleware( app ) {
  app.use( compression() );
}

module.exports = middleware;
