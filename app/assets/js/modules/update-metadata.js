'use strict';

/**
 * module variables
 */
var addCurrentItemToPage;
var updateItemControls;

/**
 * module dependencies
 */
addCurrentItemToPage = require( './add-current-item-to-page' );
updateItemControls = require('./update-item-controls');

/**
 * @param {Object} app_data
 * @param {Object} app_data.api_result
 * @param {Array}  app_data.api_result.results
 */
module.exports = function updateMetadata( app_data ) {
  app_data.items = app_data.items.concat( app_data.api_result.results );
  updateItemControls( app_data );
  addCurrentItemToPage( app_data );
};