'use strict';

/**
 * module variables
 */
var lib;
var calculateCurrentPage;
var updateMetadata;

/**
 * module dependencies
 */
lib = require( 'node-front-end-lib' );
calculateCurrentPage = require( './calculate-current-page' );
updateMetadata = require( './update-metadata' );

/**
 * @returns {string}
 */
function getUrl( app_data ) {
  return '/ajax/get-mapping?project=' + app_data.project +
    '&paging=' + app_data.current_page +
    '&limit=' + app_data.items_per_page_limit;
}

/**
 * @param {Object} app_data
 */
module.exports = function callApi( app_data ) {
  var response;

  calculateCurrentPage( app_data );

  lib.ajax.get( getUrl( app_data ) )
    .then( function ( xhr ) {
      app_data.search.value = '';
      response = lib.extractXhrResponse( xhr );
      app_data.api_result = JSON.parse( response );
      updateMetadata( app_data );
    } )
    .catch( function ( err ) {
      console.log( err );
    } );
};