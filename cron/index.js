'use strict';

/**
 * module dependencies
 */
var createAddPinsCrongJob = require( './create-add-pins-cron-job' );
var createMetadataCronJob = require( './create-metadata-cron-job' );
var createRotateQueuedCronJob = require( './create-rotate-queued-cron-job' );
var validateCronConfig = require( './validate-cron-config' );

function cron() {
  validateCronConfig();
  createAddPinsCrongJob();
  createMetadataCronJob();
  createRotateQueuedCronJob();
}

module.exports = cron;
