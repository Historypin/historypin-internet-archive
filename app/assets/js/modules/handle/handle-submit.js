'use strict';

/**
 * module dependencies
 */
var getPinDetails = require( './get-pin-details' );
var getProjectPinIds = require( './get-project-pin-ids' );
var handleGetPinDetails = require( './handle-get-pin-details' );
var handleGetProjectPinIds = require( './handle-get-project-pin-ids' );
var setupDynamicAppData = require( './setup-app-data-dynamic' );

/**
 * @typedef {Function} handleSubmit.call
 * @param {Event} evt
 */
module.exports = function handleSubmit( evt ) {
  var app_data;

  evt.preventDefault();
  app_data = evt.data;

  if ( app_data.search.value.length < 1 ) {
    return;
  }

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
        console.log( err );
      }
    );
};