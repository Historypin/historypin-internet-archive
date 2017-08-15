'use strict';

/**
 * module dependencies
 */
var processItemRequest = require( './process-item-request' );

/**
 * @param {Object} app_data
 * @param {number} app_data.count
 * @param {number} app_data.current_item_index
 */
function nextItem( app_data ) {
  app_data.current_item_index += 1;

  if ( app_data.current_item_index === app_data.count ) {
    app_data.current_item_index -= 1;
    return;
  }

  processItemRequest( app_data );
}

module.exports = nextItem;
