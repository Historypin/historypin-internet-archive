'use strict';

/**
 * module variables
 */
var lib;

/**
 * module dependencies
 */
lib = require( 'node-front-end-lib' );

/**
 * @link http://v76-beta-1.historypin-hrd.appspot.com/resources/docs/api/site/items/map/index.html
 * @returns {string}
 */
function getUrl( app_data ) {
  return '/ajax/get-map' +
    '?project=' + app_data.project +
    '&search=pin:pin' +
    '&paging=' + ( app_data.current_page + 1 ) +
    '&limit=' + app_data.items_per_page_limit;
}

/**
 * @param {Object} app_data
 */
module.exports = function getProjectPinIds( app_data ) {
  return lib.ajax.get( getUrl( app_data ) );
};