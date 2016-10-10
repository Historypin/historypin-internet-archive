'use strict';

/**
 * module dependenices
 */
var getBatchJobsPage = require( '../middleware/pages/page-batch-jobs' );
var processBatchJob = require( '../middleware/batch-jobs/process-batch-job' );

/**
 * @param {Function} router
 * @param {Function} router.get
 */
function addBatchJobRouting( router ) {
  router.get( '/batch-jobs', getBatchJobsPage );
  router.get( '/batch-jobs/process', processBatchJob );
}

module.exports = addBatchJobRouting;
