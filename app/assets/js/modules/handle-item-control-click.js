'use strict';

/**
 * module variables
 */
var addCurrentItemToPage;
var getPinDetails;
var getProjectPinIds;
var handleGetPinDetails;
var handleGetProjectPinIds;
var updateItemControls;

/**
 * module dependencies
 */
addCurrentItemToPage = require( './add-current-item-to-page' );
getPinDetails = require( './get-pin-details' );
getProjectPinIds = require( './get-project-pin-ids' );
handleGetPinDetails = require( './handle-get-pin-details' );
handleGetProjectPinIds = require( './handle-get-project-pin-ids' );
updateItemControls = require( './update-item-controls' );

/**
 * @param {Event} evt
 */
module.exports = function handleItemControlClick( evt ) {
  var app_data;
  var button;

  evt.preventDefault();
  app_data = evt.data;
  button = evt.target || evt.srcElement;

  // increment/decrement current item index
  if ( button.getAttribute( 'data-action' ) === 'previous' ) {
    app_data.current_item_index -= 1;
  } else {
    app_data.current_item_index += 1;
  }

  // handle current item index = total count
  if ( app_data.current_item_index === app_data.count ) {
    app_data.current_item_index -= 1;
    return;
  }

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