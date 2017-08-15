'use strict';

/**
 * module dependencies
 */
var addCurrentItemToPage = require( './add/add-current-item-to-page' );
var updateItemControls = require( './update-item-controls' );

/**
 * @param {app_data} app_data
 */
function updateMetadata( app_data ) {
  app_data.items = app_data.items.concat( app_data.api_result.results );
  updateItemControls( app_data );
  addCurrentItemToPage( app_data );
}

module.exports = updateMetadata;
