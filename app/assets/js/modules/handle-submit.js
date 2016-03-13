'use strict';

/**
 * module variables
 */
var callApi;
var setupDynamicAppData;

/**
 * module dependencies
 */
callApi = require( './call-api' );
setupDynamicAppData = require( './setup-dynamic-app-data' );

/**
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
  callApi( app_data );
};