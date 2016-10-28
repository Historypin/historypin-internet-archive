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
       * @param {string} result
       * @returns {undefined}
       */
      function ( result ) {
        console.log( new Date().toUTCString(), 'cronjob rotateQueued()', result );
      }
    )
    .catch(
      /**
       * @param {Error} err
       * @returns {undefined}
       */
      function ( err ) {
        console.log( new Date().toUTCString(), 'cronjob rotateQueued()', err );
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
