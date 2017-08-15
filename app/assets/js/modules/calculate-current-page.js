'use strict';

/**
 * @param {Object} app_data
 */
function calculateCurrentPage( app_data ) {
  if ( app_data.current_item_index === 0 ) {
    app_data.current_page = 1;
  } else {
    app_data.current_page = Math.ceil( ( app_data.current_item_index + 1 ) / app_data.items_per_page_limit );
  }

  return app_data.current_page;
}

module.exports = calculateCurrentPage;
