'use strict';

/**
 * module variables
 */
var getPinDetails;
var lib;

/**
 * module dependencies
 */
getPinDetails = require( './get-pin-details' );
lib = require('node-front-end-lib');

/**
 *
 * @param xhr
 * @param app_data
 */
module.exports = function handleGetProjectPinIds( xhr, app_data ) {
  var response;

  app_data.search.value = '';
  response = lib.extractXhrResponse( xhr );
  response = JSON.parse( response );

  if ( !( response.items instanceof Array ) || response.items.length < 1 ) {
    return;
  }

  app_data.items = app_data.items.concat( response.items );
  app_data.current_page += 1;

  if ( typeof response.count === 'number' && !isNaN( response.count ) ) {
    app_data.count = response.count;
  }

  if ( typeof response.page === 'number' && !isNaN( response.page ) ) {
    app_data.page = response.page;
  }

  if ( typeof response.limit === 'number' && !isNaN( response.limit ) ) {
    app_data.limit = response.limit;
  }
};