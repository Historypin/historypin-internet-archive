/* eslint no-new: off */

'use strict';

/**
 * module dependencies
 */
var config = require( '../app/config/index' );
var CronJob = require( 'cron' ).CronJob;
var rotateQueuedBatchJob = require( '../app/helpers/batch-jobs/rotate-queued-batch-job' );

/**
 * @returns {undefined}
 */
function rotateQueuedBatch() {
  rotateQueuedBatchJob()
    .then(
      /**
       * @param {{ batch_job: string|null, message: string|null }} result
       * @returns {undefined}
       */
      function ( result ) {
        if ( !result.message ) {
          return;
        }

        console.log( new Date().toUTCString(), 'cronjob rotateQueuedBatch()', JSON.stringify( result ) );
      }
    )
    .catch(
      /**
       * @param {Error} err
       * @returns {undefined}
       */
      function ( err ) {
        console.log( new Date().toUTCString(), 'cronjob rotateQueuedBatch()', err );
        throw err;
      }
    );
}

/**
 * @returns {undefined}
 */
function createRotateQueuedBatchCronJob() {
  new CronJob(
    config.cron.schedules.rotate_queued_batch,
    rotateQueuedBatch,
    null,
    true,
    config.timezone
  );

  console.log(
    new Date().toUTCString(),
    'cronjob rotateQueuedBatch() created - %schedule'
      .replace( '%schedule', config.cron.schedules.rotate_queued_batch )
  );
}

module.exports = createRotateQueuedBatchCronJob;
