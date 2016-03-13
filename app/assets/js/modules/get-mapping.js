'use strict';

/**
 * module variables
 */
var lib;

/**
 * module requirements
 */
lib = require( 'node-front-end-lib' );

module.exports = function getMapping( app_data ) {
  var response;

  lib.ajax.get( './json/internet-archive-to-historypin.json' )
    .then( function ( xhr ) {
      response = lib.extractXhrResponse( xhr );
      app_data.mapping = JSON.parse( response );
    } )
    .catch( function ( err ) {
      console.log( err );
    } );
};