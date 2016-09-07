'use strict';

/**
 * module variables
 */
var app_data;

/**
 * module dependencies
 */
var setupStaticAppData = require( '../modules/setup/setup-app-data-static' );
var setupDynamicAppData = require( '../modules/setup/setup-app-data-dynamic' );

module.exports = function setup( page ) {
  if ( page !== 'home' ) {
    return;
  }

  app_data = {};
  setupStaticAppData( app_data );
  setupDynamicAppData( app_data );
};
