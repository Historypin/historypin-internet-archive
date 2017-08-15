'use strict';

/**
 * @param {app_data} app_data
 */
function setupDynamicAppData( app_data ) {
  // items
  app_data.items = [];
  app_data.current_item_index = 0;
  app_data.current_page = 0;

  // setup item control initial state
  app_data.item_control.previous.disabled = true;
  app_data.item_control.next.disabled = true;
}

module.exports = setupDynamicAppData;
