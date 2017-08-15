'use strict';

/**
 * module dependencies
 */
var getPinDetails = require( './../get/get-pin-details' );
var getProjectPinIds = require( './../get/get-project-pin-ids' );
var handleError = require( './handle-error' );
var handleGetPinDetails = require( './handle-get-pin-details' );
var handleGetProjectPinIds = require( './handle-get-project-pin-ids' );
var setupDynamicAppData = require( './../setup/setup-app-data-dynamic' );

/**
 * @param {Event} evt
 */
function handleSubmit( evt ) {
  var app_data;

  evt.preventDefault();
  app_data = evt.data;

  if ( app_data.search.value.length < 1 ) {
    return;
  }

  app_data.message_to_user.innerHTML = '';
  app_data.search.blur();
  app_data.project = encodeURIComponent( app_data.search.value );
  app_data.item_control.project.innerHTML = app_data.project;

  setupDynamicAppData( app_data );

  getProjectPinIds( app_data )
    .then(
      function ( xhr ) {
        handleGetProjectPinIds.call( this, xhr, app_data );

        if ( !app_data.items.length ) {
          return;
        }

        return getPinDetails( app_data );
      }
    )
    .then(
      function ( xhr ) {
        handleGetPinDetails.call( this, xhr, app_data );
      }
    )
    .catch(
      function ( err ) {
        handleError.call( this, err, app_data );
      }
    );
}

module.exports = handleSubmit;
