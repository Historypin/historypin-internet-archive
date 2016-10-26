/* eslint global-require: off, new-cap: off */

'use strict';

/**
 * module dependencies
 */
var getFiles = require( '../helpers/get-files' );

/**
 * @param {Function} app
 * @param {Function} app.use
 *
 * @param {Function} express
 * @param {Function} express.Router
 * @param {Function} express.static
 *
 * @returns {undefined}
 */
function routes( app, express ) {
  var router = express.Router();

  app.use( express.static( 'public' ) );

  getFiles( __dirname ).reduce(
    function ( acc, file ) {
      if ( file !== 'index.js' ) {
        require( './' + file )( router );
      }

      return acc;
    },
    ''
  );

  app.use( router );
}

module.exports = routes;
