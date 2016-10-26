/* eslint global-require: off */

'use strict';

/**
 * module dependencies
 */
var getFiles = require( '../../helpers/get-files' );

/**
 * @param {Function} app
 * @returns {undefined}
 */
function middleware( app ) {
  getFiles( __dirname ).reduce(
    function ( acc, file ) {
      if ( file !== 'index.js' ) {
        require( './' + file )( app );
      }

      return acc;
    }
  );
}

module.exports = middleware;
