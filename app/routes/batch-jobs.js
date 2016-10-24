'use strict';

/**
 * module dependenices
 */
var addPinsToBatchJob = require( '../middleware/pages/addpins' );
var getBatchJobsPage = require( '../middleware/pages/batch-jobs' );
var rotateQueuedBatchJob = require( '../middleware/pages/rotate-queued-batch-job' );

/**
 * @param {Function} router
 * @param {Function} router.get
 */
function addBatchJobRouting( router ) {
  router.get( '/batch-jobs', getBatchJobsPage );
  router.get( '/batch-jobs/addpins', addPinsToBatchJob );
  router.get( '/batch-jobs/rotate-queued', rotateQueuedBatchJob );
}

module.exports = addBatchJobRouting;
