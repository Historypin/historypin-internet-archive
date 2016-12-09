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
function rotateQueued() {
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

        console.log( new Date().toUTCString(), 'cronjob rotateQueued()', JSON.stringify( result ) );
      }
    )
    .catch(
      /**
       * @param {Error} err
       * @returns {undefined}
       */
      function ( err ) {
        console.log( new Date().toUTCString(), 'cronjob rotateQueued()', err );
        throw err;
      }
    );
}

/**
 * @returns {undefined}
 */
function createRotateQueuedCronJob() {
  new CronJob(
    config.cron.schedules.rotate_queued,
    rotateQueued,
    null,
    true,
    config.timezone
  );

  console.log(
    new Date().toUTCString(),
    'cronjob rotateQueued() created - %schedule'
      .replace( '%schedule', config.cron.schedules.rotate_queued )
  );
}

module.exports = createRotateQueuedCronJob;
