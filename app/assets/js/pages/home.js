'use strict';

/**
 * module dependencies
 */
var setupStaticAppData = require( '../modules/setup/setup-app-data-static' );
var setupDynamicAppData = require( '../modules/setup/setup-app-data-dynamic' );

function setup( page ) {
  /**
   * @typedef {Object} app_data
   *
   * @property {Object} api_result
   * @property {Array} api_result.results
   *
   * @property {number} current_item_index
   * @property {number} current_page
   *
   * @property {HTMLElement} form
   * @property {Array} items
   *
   * @property {Object} item_control
   * @property {HTMLCollection} item_control.buttons
   * @property {HTMLElement} item_control.current_item
   * @property {HTMLElement} item_control.create_batch_job
   * @property {HTMLElement} item_control.items_per_page_limit
   * @property {HTMLElement} item_control.next
   * @property {boolean} item_control.next.disabled
   * @property {HTMLElement} item_control.previous
   * @property {boolean} item_control.previous.disabled
   * @property {HTMLElement} item_control.project
   * @property {HTMLElement} item_control.total_items
   *
   * @property {number} items_per_page_limit
   * @property {Object} mapping
   * @property {HTMLElement} message_to_user
   *
   * @property {Object} metadata
   * @property {HTMLElement} metadata.row
   * @property {HTMLElement} metadata.historypin
   * @property {HTMLElement} metadata.internet_archive
   *
   * @property {HTMLElement} search
   *
   */
  var app_data = {};

  if ( page !== 'home' ) {
    return;
  }

  setupStaticAppData( app_data );
  setupDynamicAppData( app_data );
}

module.exports = setup;
