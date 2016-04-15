'use strict';

/**
 * module variables
 */
var addCurrentItemToPage;
var getPinDetails;
var getProjectPinIds;
var setupDynamicAppData;
var updateItemControls;
var lib;

/**
 * module dependencies
 */
addCurrentItemToPage = require( './add-current-item-to-page' );
getPinDetails = require( './get-pin-details' );
getProjectPinIds = require( './get-project-pin-ids' );
setupDynamicAppData = require( './setup-app-data-dynamic' );
updateItemControls = require('./update-item-controls');
lib = require('node-front-end-lib');

/**
 * @param {Event} evt
 */
module.exports = function handleSubmit( evt ) {
  var app_data;
  var response;

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
        app_data.search.value = '';
        response = lib.extractXhrResponse( xhr );
        response = JSON.parse( response );

        if ( response.items instanceof Array && response.items.length > 0 ) {
          app_data.items = response.items;
        }

        if ( typeof response.count === 'number' && !isNaN( response.count ) ) {
          app_data.count = response.count;
        }

        if ( typeof response.page === 'number' && !isNaN( response.page ) ) {
          app_data.page = response.page;
        }

        if ( typeof response.limit === 'number' && !isNaN( response.limit ) ) {
          app_data.limit = response.limit;
        }

        return getPinDetails( app_data );
      }
    )
    .then(
      function ( xhr ) {
        app_data.search.value = '';
        response = lib.extractXhrResponse( xhr );
        response = JSON.parse( response );

        if ( response instanceof Object ) {
          app_data.current_item = response;
        }

        updateItemControls( app_data );
        addCurrentItemToPage( app_data );
      }
    )
    .catch(
      function ( err ) {
        console.log( err );
      }
    );
};