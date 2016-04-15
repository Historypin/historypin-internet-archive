'use strict';

/**
 * module variables
 */
var addCurrentItemToPage;
var lib;
var updateItemControls;

/**
 * module dependencies
 */
addCurrentItemToPage = require( './add-current-item-to-page' );
lib = require( 'node-front-end-lib' );
updateItemControls = require('./update-item-controls');

/**
 * @param {XMLHttpRequest} xhr
 * @param {Object} app_data
 */
module.exports = function handleGetPinDetails( xhr, app_data ) {
  var response;

  app_data.search.value = '';
  response = lib.extractXhrResponse( xhr );
  response = JSON.parse( response );

  if ( response instanceof Object ) {
    app_data.items[ app_data.current_item_index ].details = response;
  }

  updateItemControls( app_data );
  addCurrentItemToPage( app_data );
};