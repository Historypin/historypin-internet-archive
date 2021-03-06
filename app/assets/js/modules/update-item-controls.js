'use strict';

/**
 * @param {Object} app_data
 */
function updateItemControls( app_data) {
  app_data.item_control.previous.disabled = ( app_data.current_item_index === 0 );
  app_data.item_control.next.disabled = ( app_data.current_item_index === app_data.count - 1 );
  app_data.item_control.create_batch_job.disabled = ( app_data.items.length < 0 );

  app_data.item_control.current_item.innerHTML = app_data.current_item_index + 1;
  app_data.item_control.current_page.innerHTML = app_data.page;
  app_data.item_control.items_per_page_limit.innerHTML = app_data.items_per_page_limit;
  app_data.item_control.total_items.innerHTML = app_data.count;
}

module.exports = updateItemControls;
