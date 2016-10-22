'use strict';

/**
 * variable assignments
 */
var express = require( 'express' );
var router = express.Router();
var ajaxRouting = require( './ajax' );
var iaReadApiRouting = require( './ia-api-read' );
var iaWriteApiRouting = require( './ia-api-write' );
var batchJobsRouting = require( './batch-jobs' );
var homeRouting = require( './home' );
var metadataJobsRouting = require( './metadata-jobs' );
var path = require( 'path' );

module.exports = function routes( app ) {
  app.use( express.static( path.join( __dirname, '..', '..', 'public' ) ) );
  ajaxRouting( router );
  iaReadApiRouting( router );
  iaWriteApiRouting( router );
  batchJobsRouting( router );
  homeRouting( router );
  metadataJobsRouting( router );
  app.use( router );
};
