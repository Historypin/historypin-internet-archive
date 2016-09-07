'use strict';

var addCurrentItemToPage = require( './../add/add-current-item-to-page' );
var getPinDetails = require( './../get/get-pin-details' );
var getProjectPinIds = require( './../get/get-project-pin-ids' );
var handleGetPinDetails = require( './../handle/handle-get-pin-details' );
var handleGetProjectPinIds = require( './../handle/handle-get-project-pin-ids' );
var updateItemControls = require( './../update-item-controls' );

/**
 * @param {Object} app_data
 */
module.exports = function processItemRequest( app_data ) {
  // get project pin ids
  if ( app_data.current_item_index === app_data.items.length - 1 ) {
    if ( app_data.current_item_index + 1 >= app_data.count ) {
      return;
    }

    getProjectPinIds( app_data )
      .then(
        function ( xhr ) {
          handleGetProjectPinIds.call( this, xhr, app_data );
        }
      )
      .catch(
        function ( err ) {
          console.log( err );
        }
      );
  }

  // get item details
  if ( app_data.items[ app_data.current_item_index ] && !app_data.items[ app_data.current_item_index ].details ) {
    getPinDetails( app_data )
      .then(
        function ( xhr ) {
          handleGetPinDetails.call( this, xhr, app_data );
        }
      )
      .catch(
        function ( err ) {
          console.log( err );
        }
      );

    return;
  }

  updateItemControls( app_data );
  addCurrentItemToPage( app_data );
};
