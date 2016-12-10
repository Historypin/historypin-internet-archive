'use strict';

/**
 * module dependencies
 */
var createAddPinsCrongJob = require( './create-add-pins-cron-job' );
var createMetadataCronJob = require( './create-metadata-cron-job' );
var createProcessMetadataCronJob = require( './create-process-metadata-cron-job' );
var createRotateQueuedBatchCronJob = require( './create-rotate-queued-batch-cron-job' );
var createRotateQueuedMetadataCronJob = require( './create-rotate-queued-metadata-cron-job' );
var validateCronConfig = require( './validate-cron-config' );

function cron() {
  validateCronConfig();
  createAddPinsCrongJob();
  createMetadataCronJob();
  createProcessMetadataCronJob();
  createRotateQueuedBatchCronJob();
  createRotateQueuedMetadataCronJob();
}

module.exports = cron;
