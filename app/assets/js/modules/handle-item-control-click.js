'use strict';

/**
 * module variables
 */
var addCurrentItemToPage;
var callApi;
var updateItemControls;

/**
 * module dependencies
 */
addCurrentItemToPage = require( './add-current-item-to-page' );
callApi = require( './call-api' );
updateItemControls = require( './update-item-controls' );

/**
 * @param {Event} evt
 */
module.exports = function handleItemControlClick( evt ) {
  var app_data;
  var button;

  evt.preventDefault();
  app_data = evt.data;
  button = evt.target || evt.srcElement;

  if ( button.getAttribute( 'data-action' ) === 'previous' ) {
    app_data.current_item_index -= 1;
  } else {
    app_data.current_item_index += 1;
  }

  if ( app_data.current_item_index === app_data.api_result.count ) {
    app_data.current_item_index -= 1;
    return;
  }

  if ( app_data.current_item_index === app_data.items.length - 1 ) {
    callApi( app_data );
    return;
  }

  updateItemControls( app_data );
  addCurrentItemToPage( app_data );
};