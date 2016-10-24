'use strict';

/**
 * module dependencies
 */
var callApi = require( '../middleware/api/call-api' );
var createBatchJob = require( '../middleware/batch-jobs/create-batch-job' );
var pauseBatchJob = require( '../middleware/batch-jobs/pause-batch-job' );
var playBatchJob = require( '../middleware/batch-jobs/play-batch-job' );

/**
 * @param {Function} router
 * @param {Function} router.get
 * @param {Function} router.post
 */
function addAjaxRouting( router ) {
  router.get( '/ajax/get-map', callApi );
  router.get( '/ajax/get-mapping', callApi );
  router.get( '/ajax/get-pin', callApi );
  router.post( '/ajax/create-batch-job', createBatchJob );
  router.post( '/ajax/pause-batch-job', pauseBatchJob );
  router.post( '/ajax/play-batch-job', playBatchJob );
}

module.exports = addAjaxRouting;
