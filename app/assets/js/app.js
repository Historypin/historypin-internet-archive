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
setupStaticAppData = require( './modules/setup-static-app-data' );
setupDynamicAppData = require( './modules/setup-dynamic-app-data' );

// app setup
app_data = {};
setupStaticAppData( app_data );
setupDynamicAppData( app_data );