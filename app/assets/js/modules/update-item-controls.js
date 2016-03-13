'use strict';

/**
 * module variables
 */
var calculateCurrentPage;

/**
 * module dependencies
 */
calculateCurrentPage = require( './calculate-current-page' );

/**
 * @param {Object} app_data
 */
module.exports = function updateItemControls( app_data) {
  app_data.item_control.previous.disabled = ( app_data.current_item_index === 0 );
  app_data.item_control.next.disabled = ( app_data.current_item_index === app_data.api_result.count - 1 );

  app_data.item_control.total_items.innerHTML = app_data.api_result.count;
  app_data.item_control.current_item.innerHTML = app_data.current_item_index + 1;
  app_data.item_control.current_page.innerHTML = calculateCurrentPage( app_data );
  app_data.item_control.items_per_page_limit.innerHTML = app_data.api_result.limit;
};