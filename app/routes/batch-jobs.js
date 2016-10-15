'use strict';

/**
 * module dependenices
 */
var addPinsToBatchJob = require( '../middleware/pages/addpins' );
var createPinDetailsJob = require( '../middleware/pages/pindetails' );
var getBatchJobsPage = require( '../middleware/pages/batch-jobs' );
var rotateBatchJob = require( '../middleware/pages/rotate' );

/**
 * @param {Function} router
 * @param {Function} router.get
 */
function addBatchJobRouting( router ) {
  router.get( '/batch-jobs', getBatchJobsPage );
  router.get( '/batch-jobs/addpins', addPinsToBatchJob );
  router.get( '/batch-jobs/pindetails', createPinDetailsJob );
  router.get( '/batch-jobs/rotate', rotateBatchJob );
}

module.exports = addBatchJobRouting;
