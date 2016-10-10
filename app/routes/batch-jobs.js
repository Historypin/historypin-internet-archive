'use strict';

/**
 * module dependenices
 */
var getBatchJobsPage = require( '../middleware/pages/batch-jobs' );
var rotateBatchJob = require( '../middleware/pages/rotate-batch-job' );
var addPinsToBatchJob = require( '../middleware/pages/add-pins-to-batch-job' );

/**
 * @param {Function} router
 * @param {Function} router.get
 */
function addBatchJobRouting( router ) {
  router.get( '/batch-jobs', getBatchJobsPage );
  router.get( '/batch-jobs/rotate', rotateBatchJob );
  router.get( '/batch-jobs/addpins', addPinsToBatchJob );
}

module.exports = addBatchJobRouting;
