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
 * @link http://v76-beta-1.historypin-hrd.appspot.com/resources/docs/api/site/items/details/index.html
 * @returns {string}
 */
function getUrl( app_data ) {

  app_data.current_id = app_data.items[ app_data.current_item_index ][ 0 ];

  return '/ajax/get-pin' +
    '?project=' + app_data.project +
    '&id=' + app_data.current_id;
}

/**
 * @param {Object} app_data
 * @returns {Promise}
 */
module.exports = function getPinDetails( app_data ) {
  return lib.ajax.get( getUrl( app_data ) );
};