'use strict';

/**
 * module variables
 */
var addCurrentItemToPage;
var lib;
var updateItemControls;

/**
 * module dependencies
 */
addCurrentItemToPage = require( './../add/add-current-item-to-page' );
lib = require( 'node-front-end-lib' );
updateItemControls = require( './../update-item-controls' );

/**
 * @typedef {Function} handleGetPinDetails.call
 *
 * @param {XMLHttpRequest} xhr
 * @param {Object} app_data
 */
module.exports = function handleGetPinDetails( xhr, app_data ) {
  var response;

  app_data.search.value = '';
  response = lib.extractXhrResponse( xhr );
  response = JSON.parse( response );

  response.id = app_data.current_id;

  if ( response instanceof Object ) {
    if ( Object.keys instanceof Function ) {
      app_data.items[ app_data.current_item_index ].details = {};

      Object.keys( response ).sort().forEach( function ( key ) {
        app_data.items[ app_data.current_item_index ].details[ key ] = response[ key ];
      } );
    } else {
      app_data.items[ app_data.current_item_index ].details = response;
    }
  }

  updateItemControls( app_data );
  addCurrentItemToPage( app_data );
};