'use strict';

/**
 * module variables
 */
var app_data;
var setupStaticAppData;
var setupDynamicAppData;

/**
 * module dependencies
 */
setupStaticAppData = require( './modules/setup-app-data-static' );
setupDynamicAppData = require( './modules/setup-app-data-dynamic' );

// app setup
app_data = {};
setupStaticAppData( app_data );
setupDynamicAppData( app_data );