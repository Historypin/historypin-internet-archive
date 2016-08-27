'use strict';

/**
 * module variables
 */
var app_data;

/**
 * module dependencies
 */
var getBatchJobRows = require( '../modules/batch-jobs/get-batch-job-rows' );

module.exports = function setup( page ) {
  if ( page !== 'batch-jobs' ) {
    return;
  }

  app_data = {};
  app_data.batch_job_rows = document.getElementById( 'batch-job-rows' );
  getBatchJobRows( app_data );
};
