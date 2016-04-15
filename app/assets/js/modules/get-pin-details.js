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
  return '/ajax/get-pin' +
    '?project=' + app_data.project +
    '&id=' + app_data.items[0][0];
}

/**
 * @param {Object} app_data
 */
module.exports = function getPinDetails( app_data ) {
  return lib.ajax.get( getUrl( app_data ) );
};