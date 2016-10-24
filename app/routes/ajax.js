'use strict';

/**
 * module dependencies
 */
var callApi = require( '../middleware/api/call-api' );
var createBatchJob = require( '../middleware/batch-jobs/create-batch-job' );
var playPauseBatchJob = require( '../middleware/batch-jobs/play-pause-batch-job' );

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
  router.post( '/ajax/play-pause-batch-job', playPauseBatchJob );
}

module.exports = addAjaxRouting;
