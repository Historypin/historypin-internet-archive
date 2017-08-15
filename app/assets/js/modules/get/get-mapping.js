'use strict';

/**
 * module requirements
 */
var lib = require( 'node-front-end-lib' );

/**
 * @param {Object} app_data
 */
function getMapping( app_data ) {
  var response;

  lib.ajax.get( './json/internet-archive-to-historypin.json' )
    .then(
      function ( xhr ) {
        response = lib.extractXhrResponse( xhr );
        app_data.mapping = JSON.parse( response );
      }
    )
    .catch(
      function ( err ) {
        console.log( err );
      }
    );
}

module.exports = getMapping;
