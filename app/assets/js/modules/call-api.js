'use strict';

/**
 * module variables
 */
var lib;
var updateMetadata;

/**
 * module dependencies
 */
lib = require( 'node-front-end-lib' );
updateMetadata = require( './update-metadata' );

/**
 * @returns {string}
 */
function getUrl( app_data ) {
  return '/ajax/get-mapping?project=' + app_data.project +
    '&paging=' + ( app_data.current_page + 1 ) +
    '&limit=' + app_data.items_per_page_limit;
}

/**
 * @param {Object} app_data
 */
module.exports = function callApi( app_data ) {
  var response;

  lib.ajax.get( getUrl( app_data ) )
    .then( function ( xhr ) {
      app_data.search.value = '';
      response = lib.extractXhrResponse( xhr );
      response = JSON.parse( response );

      if ( response.results instanceof Array && response.results.length > 0 ) {
        app_data.api_result = response;
        app_data.current_page += 1;
      }

      updateMetadata( app_data );
    } )
    .catch( function ( err ) {
      console.log( err );
    } );
};