'use strict';

/**
 * module dependencies
 */
var csrf = require( 'csurf' );

/**
 * @param {Function} app
 * @param {Function} app.use
 *
 * @returns {undefined}
 */
function middleware( app ) {
  var csrf_config = {
    cookie: true
  };

  app.use( csrf( csrf_config ) );
}

module.exports = middleware;
