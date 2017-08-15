'use strict';

/**
 * module dependencies
 */
var processItemRequest = require( './process-item-request' );

/**
 * @param {Object} app_data
 */
function previousItem( app_data ) {
  app_data.current_item_index -= 1;
  processItemRequest( app_data );
}

module.exports = previousItem;
